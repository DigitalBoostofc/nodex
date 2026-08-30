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

const SCAN_MS = 11000;
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
    let poll = 0;
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

      const sketch = (p: p5) => {
        let originalImg: p5.Image | undefined;
        let img: p5.Image | undefined;
        let palette: p5.Color[] = [];
        let points: {
          pos: p5.Vector;
          originalPos: p5.Vector;
          vel: p5.Vector;
        }[] = [];

        let lastSpacing = -1;
        let lastNoiseScale = -1;
        let lastDensity = -1;
        let lastInvertImage: boolean | null = null;
        let magnifierX = 0;
        let magnifierY = 0;
        let pointerSeen = false;
        const magnifierInertia = 0.12;

        p.setup = () => {
          const { clientWidth, clientHeight } = containerRef.current!;
          p.createCanvas(Math.max(1, clientWidth), Math.max(1, clientHeight));
          p.pixelDensity(1);
          p.colorMode(p.RGB, 255);
          magnifierX = p.width / 2;
          magnifierY = p.height / 2;
          buildPalette();
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

        p.mouseMoved = () => {
          pointerSeen = true;
        };
        p.touchMoved = () => {
          pointerSeen = true;
          return true;
        };

        relayout = () => {
          const node = containerRef.current;
          if (!node) return;
          const nextW = node.clientWidth;
          const nextH = node.clientHeight;
          if (nextW < 2 || nextH < 2) return;
          if (nextW !== p.width || nextH !== p.height) {
            p.resizeCanvas(nextW, nextH);
          }
          if (!originalImg) return;
          processImage();
          generatePoints();
        };

        function buildPalette() {
          palette = NODEX_SWATCHES.map((hex) => p.color(hex));
        }

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
          if (propsRef.current.invertImage) {
            img.loadPixels();
            for (let i = 0; i < img.pixels.length; i += 4) {
              img.pixels[i] = 255 - img.pixels[i];
              img.pixels[i + 1] = 255 - img.pixels[i + 1];
              img.pixels[i + 2] = 255 - img.pixels[i + 2];
            }
            img.updatePixels();
          }
          lastInvertImage = propsRef.current.invertImage;
        }

        function generatePoints() {
          if (!img) return;
          points = [];
          const {
            spacing: gap,
            density: keep,
            noiseScale: noise,
          } = propsRef.current;
          const safeSpacing = Math.max(3, gap);

          for (let y = 0; y < img.height; y += safeSpacing) {
            for (let x = 0; x < img.width; x += safeSpacing) {
              if (p.random() > keep) continue;
              const nx = p.noise(x * noise, y * noise) - 0.5;
              const ny =
                p.noise((x + 500) * noise, (y + 500) * noise) - 0.5;
              const px = x + nx * safeSpacing;
              const py = y + ny * safeSpacing;
              points.push({
                pos: p.createVector(px, py),
                originalPos: p.createVector(px, py),
                vel: p.createVector(0, 0),
              });
            }
          }

          lastSpacing = gap;
          lastNoiseScale = noise;
          lastDensity = keep;
        }

        function applyForceField(mx: number, my: number) {
          const props = propsRef.current;
          if (!props.magnifierEnabled) return;
          const cursor = p.createVector(mx, my);

          for (const pt of points) {
            const dir = P5.Vector.sub(pt.pos, cursor);
            const d = dir.mag();
            if (d < props.magnifierRadius) {
              dir.normalize();
              const falloff = 1 - d / props.magnifierRadius;
              dir.mult(props.forceStrength * falloff * falloff);
              pt.vel.add(dir);
            }
            pt.vel.mult(props.friction);
            const restore = P5.Vector.sub(pt.pos, pt.originalPos).mult(
              -props.restoreSpeed,
            );
            pt.vel.add(restore);
            pt.pos.add(pt.vel);
          }
        }

        p.draw = () => {
          if (!img) return;
          p.clear();

          const props = propsRef.current;

          if (props.invertImage !== lastInvertImage) {
            processImage();
          }
          if (
            props.spacing !== lastSpacing ||
            props.noiseScale !== lastNoiseScale ||
            props.density !== lastDensity
          ) {
            generatePoints();
          }

          if (pointerSeen) {
            magnifierX = p.lerp(magnifierX, p.mouseX, magnifierInertia);
            magnifierY = p.lerp(magnifierY, p.mouseY, magnifierInertia);
            applyForceField(magnifierX, magnifierY);
          }

          img.loadPixels();
          p.noFill();

          const scanT = (p.millis() % SCAN_MS) / SCAN_MS;
          const scanY = scanT * p.height;

          for (const pt of points) {
            const x = pt.pos.x;
            const y = pt.pos.y;
            const d = p.dist(x, y, magnifierX, magnifierY);
            const px = p.constrain(Math.floor(x), 0, img.width - 1);
            const py = p.constrain(Math.floor(y), 0, img.height - 1);
            const index = (px + py * img.width) * 4;
            const red = img.pixels[index];
            const green = img.pixels[index + 1];
            const blue = img.pixels[index + 2];
            if (red === undefined) continue;
            const brightness = Math.max(red, green, blue);
            const isRedMark = red > 70 && red > green + 40 && red > blue + 40;

            const fillField = !props.invertWireframe && props.threshold <= 0;
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
              : p.constrain(
                  Math.floor(
                    p.map(brightness, 0, 255, 0, palette.length - 1),
                  ),
                  0,
                  palette.length - 1,
                );
            let strokeSize = p.map(
              mark,
              0,
              255,
              props.minStroke,
              props.maxStroke,
            );
            if (props.magnifierEnabled && pointerSeen && d < props.magnifierRadius) {
              strokeSize *= p.map(d, 0, props.magnifierRadius, 2.2, 1);
            }
            const color = palette[shadeIndex];
            if (!color) continue;

            const onMark = isRedMark || mark > 48;
            let drawX = x;
            let drawY = y;
            if (onMark) {
              const dist = y - scanY;
              if (Math.abs(dist) < WAVE_BAND) {
                const env = 1 - Math.abs(dist) / WAVE_BAND;
                const env2 = env * env;
                const phase =
                  pt.originalPos.x * 0.048 + p.millis() * 0.007;
                drawX = x + Math.sin(phase) * 26 * env2;
                drawY =
                  y +
                  Math.cos(phase * 0.72) * 10 * env2 +
                  Math.sin((dist / WAVE_BAND) * Math.PI) * 14 * env;
              }
            }

            p.stroke(color);
            p.strokeWeight(strokeSize);
            p.point(drawX, drawY);
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
      poll = window.setInterval(syncSize, 250);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("resize", syncSize);
      window.clearInterval(poll);
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
