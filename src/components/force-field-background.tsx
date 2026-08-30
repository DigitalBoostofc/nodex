"use client";

import { useEffect, useRef, useState } from "react";

export type ForceFieldBackgroundProps = {
  /** Source image whose brightness map becomes the particle field. */
  imageUrl?: string;
  /** Kept for API compatibility; Nodex uses a fixed red/white/black palette. */
  hue?: number;
  saturation?: number;
  threshold?: number;
  minStroke?: number;
  maxStroke?: number;
  spacing?: number;
  noiseScale?: number;
  density?: number;
  invertImage?: boolean;
  invertWireframe?: boolean;
  magnifierEnabled?: boolean;
  magnifierRadius?: number;
  forceStrength?: number;
  friction?: number;
  restoreSpeed?: number;
  /** Where the NX mark sits. Omit to infer from canvas width (slot vs overlay). */
  markAlign?: "center" | "right";
  /** Mark size as a fraction of the canvas. Omit to infer with `markAlign`. */
  markScale?: number;
  className?: string;
};

const SCAN_MS = 15000;
const WAVE_BAND = 92;

const NODEX_SWATCHES = [
  "#ffffff",
  "#f2f2f2",
  "#ff9a9a",
  "#ff1420",
  "#e10600",
  "#8e0000",
  "#3a1414",
  "#141414",
] as const;

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  shadeIndex: number;
  strokeSize: number;
  onMark: boolean;
};

/**
 * NX particle field on a native canvas. p5 is not used — it added ~1MB of
 * parse/eval on the main thread and showed up as TBT on GTmetrix.
 */
export function ForceFieldBackground({
  imageUrl = "/assets/symbol-on-black.png",
  threshold = 255,
  minStroke = 1.2,
  maxStroke = 4,
  spacing = 10,
  density = 2,
  invertImage = true,
  invertWireframe = true,
  markAlign,
  markScale,
  className = "",
}: ForceFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const propsRef = useRef({
    threshold,
    minStroke,
    maxStroke,
    spacing,
    density,
    invertImage,
    invertWireframe,
    markAlign,
    markScale,
  });

  useEffect(() => {
    propsRef.current = {
      threshold,
      minStroke,
      maxStroke,
      spacing,
      density,
      invertImage,
      invertWireframe,
      markAlign,
      markScale,
    };
  }, [
    threshold,
    minStroke,
    maxStroke,
    spacing,
    density,
    invertImage,
    invertWireframe,
    markAlign,
    markScale,
  ]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let cancelled = false;
    let raf = 0;
    let observer: ResizeObserver | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let source: HTMLImageElement | null = null;
    let pixels: Uint8ClampedArray | null = null;
    let imgW = 0;
    let imgH = 0;
    let pointsByShade: Particle[][] = NODEX_SWATCHES.map(() => []);
    let scanLineEls: Element[] | null = null;

    function size() {
      if (!node) return { w: 0, h: 0 };
      return {
        w: Math.max(1, node.clientWidth),
        h: Math.max(1, node.clientHeight),
      };
    }

    function buildPoints() {
      if (!canvas || !source) return;
      const props = propsRef.current;
      const { w, h } = size();
      if (w < 2 || h < 2) return;

      const overlay = w >= 720;
      const fraction = props.markScale ?? (overlay ? 0.6 : 1.22);
      const scale = Math.min(
        (w * fraction) / source.naturalWidth,
        (h * fraction) / source.naturalHeight,
      );
      const drawW = source.naturalWidth * scale;
      const drawH = source.naturalHeight * scale;
      const align = props.markAlign ?? (overlay ? "right" : "center");
      const drawX =
        align === "right"
          ? Math.max(w * 0.36, w - drawW - w * 0.1)
          : (w - drawW) / 2;
      const drawY = overlay ? (h - drawH) / 2 : -drawH * 0.21;

      const layer = document.createElement("canvas");
      layer.width = w;
      layer.height = h;
      const layerCtx = layer.getContext("2d", { willReadFrequently: true });
      if (!layerCtx) return;
      layerCtx.fillStyle = "#000";
      layerCtx.fillRect(0, 0, w, h);
      layerCtx.drawImage(source, drawX, drawY, drawW, drawH);
      const sample = layerCtx.getImageData(0, 0, w, h);
      pixels = sample.data;
      imgW = w;
      imgH = h;

      if (props.invertImage) {
        for (let i = 0; i < pixels.length; i += 4) {
          pixels[i] = 255 - pixels[i];
          pixels[i + 1] = 255 - pixels[i + 1];
          pixels[i + 2] = 255 - pixels[i + 2];
        }
      }

      const fillField = !props.invertWireframe && props.threshold <= 0;
      const gap = Math.max(3, props.spacing);
      const keep = props.density;
      pointsByShade = NODEX_SWATCHES.map(() => []);

      for (let y = 0; y < imgH; y += gap) {
        for (let x = 0; x < imgW; x += gap) {
          if (keep <= 1 && Math.random() > keep) continue;
          const index = (x + y * imgW) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          if (red === undefined) continue;
          const brightness = Math.max(red, green, blue);
          const isRedMark =
            red > 55 &&
            red > green + 18 &&
            red > blue + 18 &&
            red > green * 1.15;
          const isWhiteMark =
            brightness >= 140 &&
            green >= red * 0.72 &&
            blue >= red * 0.72 &&
            Math.abs(green - blue) < 40;
          if (fillField && !isRedMark && !isWhiteMark) continue;
          const visible = fillField
            ? true
            : props.invertWireframe
              ? brightness < props.threshold
              : brightness > props.threshold;
          if (!visible) continue;

          const mark = isRedMark ? Math.max(brightness, 235) : brightness;
          const shadeIndex = fillField
            ? isRedMark
              ? 3
              : 1
            : Math.max(
                0,
                Math.min(
                  NODEX_SWATCHES.length - 1,
                  Math.floor((brightness / 255) * (NODEX_SWATCHES.length - 1)),
                ),
              );
          const particle: Particle = {
            x,
            y,
            ox: x,
            oy: y,
            shadeIndex,
            strokeSize:
              props.minStroke +
              (mark / 255) * (props.maxStroke - props.minStroke),
            onMark: isRedMark || mark > 48,
          };
          const bucket = pointsByShade[shadeIndex];
          if (bucket) bucket.push(particle);
        }
      }
    }

    function relayout() {
      if (!canvas || !node) return;
      const { w, h } = size();
      if (w < 2 || h < 2) return;
      const hasPoints = pointsByShade.some((bucket) => bucket.length > 0);
      if (canvas.width === w && canvas.height === h && hasPoints) return;
      canvas.width = w;
      canvas.height = h;
      buildPoints();
    }

    function scanYs(): number[] {
      if (!canvas) return [0];
      const fallback = [
        ((performance.now() % SCAN_MS) / SCAN_MS) * canvas.height,
      ];
      if (!scanLineEls) {
        scanLineEls = [
          ...(containerRef.current
            ?.closest("section")
            ?.querySelectorAll("[data-nx-anim='line']") ?? []),
        ];
      }
      if (scanLineEls.length === 0) return fallback;
      const box = canvas.getBoundingClientRect();
      if (box.height < 2) return fallback;
      const ys: number[] = [];
      for (const el of scanLineEls) {
        const line = el.getBoundingClientRect();
        if (line.height < 2) continue;
        const center = line.top + line.height / 2;
        ys.push(((center - box.top) / box.height) * canvas.height);
      }
      return ys.length > 0 ? ys : fallback;
    }

    function draw(now: number) {
      if (cancelled || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ys = scanYs();
      for (let i = 0; i < pointsByShade.length; i++) {
        const bucket = pointsByShade[i];
        if (!bucket || bucket.length === 0) continue;
        ctx.fillStyle = NODEX_SWATCHES[i] ?? "#ffffff";
        for (const pt of bucket) {
          let drawX = pt.x;
          let drawY = pt.y;
          if (pt.onMark) {
            let dist = 0;
            let nearest = WAVE_BAND;
            for (const scanY of ys) {
              const d = pt.y - scanY;
              const ad = Math.abs(d);
              if (ad < nearest) {
                nearest = ad;
                dist = d;
              }
            }
            if (nearest < WAVE_BAND) {
              const env = 1 - nearest / WAVE_BAND;
              const env2 = env * env;
              const phase = pt.ox * 0.048 + now * 0.0035;
              drawX = pt.x + Math.sin(phase) * 18 * env2;
              drawY =
                pt.y +
                Math.cos(phase * 0.72) * 7 * env2 +
                Math.sin((dist / WAVE_BAND) * Math.PI) * 10 * env;
            }
          }
          const s = pt.strokeSize;
          ctx.fillRect(drawX - s * 0.5, drawY - s * 0.5, s, s);
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (cancelled || !node) return;
      canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) {
        setError("Não foi possível iniciar o campo de partículas.");
        return;
      }
      node.appendChild(canvas);
      const { w, h } = size();
      canvas.width = Math.max(1, w);
      canvas.height = Math.max(1, h);

      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        source = img;
        relayout();
        raf = requestAnimationFrame(draw);
      };
      img.onerror = () => {
        setError("Não foi possível carregar o mapa de partículas.");
      };
      img.src = imageUrl;

      observer = new ResizeObserver(() => {
        relayout();
      });
      observer.observe(node);
    }

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      canvas?.remove();
    };
  }, [imageUrl, markAlign, markScale]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`relative h-full w-full overflow-hidden bg-transparent [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full ${className}`}
    >
      {error ? (
        <p className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.18em] text-nx-red/70 uppercase">
          {error}
        </p>
      ) : null}
    </div>
  );
}
