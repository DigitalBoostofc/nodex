"use client";

import { useEffect, useRef, useState } from "react";
import type p5 from "p5";

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

/**
 * Interactive particle field. p5 is loaded only in the browser so the
 * home RSC bundle stays free of the canvas runtime.
 */
export function ForceFieldBackground({
  imageUrl = "/assets/symbol-on-black.png",
  hue = 2,
  saturation = 100,
  threshold = 255,
  minStroke = 1.2,
  maxStroke = 4,
  spacing = 10,
  noiseScale = 0,
  density = 2,
  invertImage = true,
  invertWireframe = true,
  magnifierEnabled = true,
  magnifierRadius = 170,
  forceStrength = 13,
  friction = 0.9,
  restoreSpeed = 0.05,
  markAlign,
  markScale,
  className = "",
}: ForceFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [error, setError] = useState<string | null>(null);

  const propsRef = useRef({
    hue,
    saturation,
    threshold,
    minStroke,
    maxStroke,
    spacing,
    noiseScale,
    density,
    invertImage,
    invertWireframe,
    magnifierEnabled,
    magnifierRadius,
    forceStrength,
    friction,
    restoreSpeed,
    markAlign,
    markScale,
  });

  useEffect(() => {
    propsRef.current = {
      hue,
      saturation,
      threshold,
      minStroke,
      maxStroke,
      spacing,
      noiseScale,
      density,
      invertImage,
      invertWireframe,
      magnifierEnabled,
      magnifierRadius,
      forceStrength,
      friction,
      restoreSpeed,
      markAlign,
      markScale,
    };
  }, [
    hue,
    saturation,
    threshold,
    minStroke,
    maxStroke,
    spacing,
    noiseScale,
    density,
    invertImage,
    invertWireframe,
    magnifierEnabled,
    magnifierRadius,
    forceStrength,
    friction,
    restoreSpeed,
    markAlign,
    markScale,
  ]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let cancelled = false;
    let observer: ResizeObserver | null = null;
    let syncSize = () => {};

    (async () => {
      const mod = await import("p5");
      if (cancelled || !containerRef.current) return;

      const P5 = (mod.default ?? mod) as typeof p5;

      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

      let relayout = () => {};
      let scanLineEls: Element[] | null = null;

      type Particle = {
        x: number;
        y: number;
        ox: number;
        oy: number;
        shadeIndex: number;
        strokeSize: number;
        onMark: boolean;
      };

      const sketch = (p: p5) => {
        let originalImg: p5.Image | undefined;
        let img: p5.Image | undefined;
        let pointsByShade: Particle[][] = NODEX_SWATCHES.map(() => []);

        let lastSpacing = -1;
        let lastNoiseScale = -1;
        let lastDensity = -1;
        let lastInvertImage: boolean | null = null;

        p.setup = () => {
          const { clientWidth, clientHeight } = containerRef.current!;
          p.createCanvas(Math.max(1, clientWidth), Math.max(1, clientHeight));
          p.pixelDensity(1);
          p.colorMode(p.RGB, 255);
          p.loadImage(
            imageUrl,
            (loaded) => {
              originalImg = loaded;
              relayout();
            },
            () => {
              setError("Não foi possível carregar o mapa de partículas.");
            },
          );
        };

        p.windowResized = () => {
          relayout();
        };

        relayout = () => {
          const node = containerRef.current;
          if (!node) return;
          const nextW = node.clientWidth;
          const nextH = node.clientHeight;
          if (nextW < 2 || nextH < 2) return;
          const sizeChanged = nextW !== p.width || nextH !== p.height;
          if (!sizeChanged && img) return;
          if (sizeChanged) {
            p.resizeCanvas(nextW, nextH);
          }
          if (!originalImg) return;
          processImage();
          generatePoints();
        };

        function processImage() {
          if (!originalImg || p.width < 2 || p.height < 2) return;

          const layer = p.createGraphics(p.width, p.height);
          layer.pixelDensity(1);
          layer.background(0);

          // Overlay (desktop, full hero) vs contained slot (mobile, ~square).
          const overlay = p.width >= 720;
          const fraction =
            propsRef.current.markScale ?? (overlay ? 0.6 : 1.22);
          const maxW = p.width * fraction;
          const maxH = p.height * fraction;
          const scale = Math.min(
            maxW / originalImg.width,
            maxH / originalImg.height,
          );
          const drawW = originalImg.width * scale;
          const drawH = originalImg.height * scale;
          const align =
            propsRef.current.markAlign ?? (overlay ? "right" : "center");
          const drawX =
            align === "right"
              ? Math.max(p.width * 0.36, p.width - drawW - p.width * 0.1)
              : (p.width - drawW) / 2;
          // Contained slot: crop the PNG's top pad so the mark hugs the CTAs.
          const drawY = overlay
            ? (p.height - drawH) / 2
            : -drawH * 0.21;
          layer.image(originalImg, drawX, drawY, drawW, drawH);

          img = layer.get();
          layer.remove();
          img.loadPixels();
          if (propsRef.current.invertImage) {
            for (let i = 0; i < img.pixels.length; i += 4) {
              img.pixels[i] = 255 - img.pixels[i];
              img.pixels[i + 1] = 255 - img.pixels[i + 1];
              img.pixels[i + 2] = 255 - img.pixels[i + 2];
            }
            img.updatePixels();
            img.loadPixels();
          }
          lastInvertImage = propsRef.current.invertImage;
        }

        function generatePoints() {
          if (!img) return;
          const pixels = img.pixels;
          const imgW = img.width;
          const imgH = img.height;
          const props = propsRef.current;
          const gap = props.spacing;
          const keep = props.density;
          const noise = props.noiseScale;
          const safeSpacing = Math.max(3, gap);
          const fillField = !props.invertWireframe && props.threshold <= 0;

          pointsByShade = NODEX_SWATCHES.map(() => []);

          for (let y = 0; y < imgH; y += safeSpacing) {
            for (let x = 0; x < imgW; x += safeSpacing) {
              if (keep <= 1 && p.random() > keep) continue;
              const nx = noise === 0 ? 0 : p.noise(x * noise, y * noise) - 0.5;
              const ny =
                noise === 0
                  ? 0
                  : p.noise((x + 500) * noise, (y + 500) * noise) - 0.5;
              const px = x + nx * safeSpacing;
              const py = y + ny * safeSpacing;
              const ix = Math.max(0, Math.min(imgW - 1, x | 0));
              const iy = Math.max(0, Math.min(imgH - 1, y | 0));
              const index = (ix + iy * imgW) * 4;
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              if (red === undefined) continue;
              const brightness = Math.max(red, green, blue);
              const isRedMark =
                red > 70 && red > green + 40 && red > blue + 40;
              if (fillField && !isRedMark && brightness < 24) continue;

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
                  : mark < 24
                    ? 5
                    : 1
                : Math.max(
                    0,
                    Math.min(
                      NODEX_SWATCHES.length - 1,
                      Math.floor(
                        (brightness / 255) * (NODEX_SWATCHES.length - 1),
                      ),
                    ),
                  );
              const strokeSize =
                props.minStroke +
                (mark / 255) * (props.maxStroke - props.minStroke);
              const particle: Particle = {
                x: px,
                y: py,
                ox: px,
                oy: py,
                shadeIndex,
                strokeSize,
                onMark: isRedMark || mark > 48,
              };
              const bucket = pointsByShade[shadeIndex];
              if (bucket) bucket.push(particle);
            }
          }

          lastSpacing = gap;
          lastNoiseScale = noise;
          lastDensity = keep;
        }

        function scanYsInCanvas() {
          const fallback = [((p.millis() % SCAN_MS) / SCAN_MS) * p.height];
          if (p.width >= 720) return fallback;

          const node = containerRef.current;
          const canvasEl = node?.querySelector("canvas");
          if (!node || !canvasEl) return fallback;

          if (!scanLineEls) {
            scanLineEls = [
              ...(node
                .closest("section")
                ?.querySelectorAll("[data-nx-anim='line']") ?? []),
            ];
          }
          if (scanLineEls.length === 0) return fallback;

          const canvas = canvasEl.getBoundingClientRect();
          if (canvas.height < 2) return fallback;

          const ys: number[] = [];
          for (const el of scanLineEls) {
            const line = el.getBoundingClientRect();
            if (line.height < 2) continue;
            const lineCenter = line.top + line.height / 2;
            ys.push(((lineCenter - canvas.top) / canvas.height) * p.height);
          }
          return ys.length > 0 ? ys : fallback;
        }

        p.draw = () => {
          if (!img) return;

          const props = propsRef.current;
          if (props.invertImage !== lastInvertImage) {
            processImage();
            generatePoints();
          }
          if (
            props.spacing !== lastSpacing ||
            props.noiseScale !== lastNoiseScale ||
            props.density !== lastDensity
          ) {
            generatePoints();
          }

          p.clear();
          const canvasEl = containerRef.current?.querySelector("canvas");
          const ctx = canvasEl?.getContext("2d");
          if (!ctx) return;

          const scanYs = scanYsInCanvas();
          const now = p.millis();

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
                for (const scanY of scanYs) {
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
        };
      };

      const instance = new P5(sketch, containerRef.current);
      p5InstanceRef.current = instance;

      syncSize = () => {
        relayout();
      };
      observer = new ResizeObserver(syncSize);
      observer.observe(containerRef.current);
      window.addEventListener("resize", syncSize);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("resize", syncSize);
      p5InstanceRef.current?.remove();
      p5InstanceRef.current = null;
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
