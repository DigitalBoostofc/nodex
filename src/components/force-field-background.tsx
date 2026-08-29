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
  className?: string;
};

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
  ]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let cancelled = false;
    let observer: ResizeObserver | null = null;

    (async () => {
      const mod = await import("p5");
      if (cancelled || !containerRef.current) return;

      const P5 = (mod.default ?? mod) as typeof p5;

      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

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
              processImage();
              generatePoints();
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

        function relayout() {
          if (!containerRef.current || !originalImg) return;
          const { clientWidth, clientHeight } = containerRef.current;
          if (clientWidth < 2 || clientHeight < 2) return;
          p.resizeCanvas(clientWidth, clientHeight);
          processImage();
          generatePoints();
        }

        function buildPalette() {
          palette = NODEX_SWATCHES.map((hex) => p.color(hex));
        }

        function processImage() {
          if (!originalImg || p.width < 2 || p.height < 2) return;

          const layer = p.createGraphics(p.width, p.height);
          layer.pixelDensity(1);
          layer.background(0);

          const maxW = p.width * 0.82;
          const maxH = p.height * 0.78;
          const scale = Math.min(
            maxW / originalImg.width,
            maxH / originalImg.height,
          );
          const drawW = originalImg.width * scale;
          const drawH = originalImg.height * scale;
          layer.image(
            originalImg,
            (p.width - drawW) / 2,
            (p.height - drawH) / 2,
            drawW,
            drawH,
          );

          img = layer.get();
          layer.remove();
          img.filter(p.GRAY);

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
              dir.mult(props.forceStrength / Math.max(1, d));
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
          p.background(0);

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

          for (const pt of points) {
            const x = pt.pos.x;
            const y = pt.pos.y;
            const d = p.dist(x, y, magnifierX, magnifierY);
            const px = p.constrain(Math.floor(x), 0, img.width - 1);
            const py = p.constrain(Math.floor(y), 0, img.height - 1);
            const index = (px + py * img.width) * 4;
            const brightness = img.pixels[index];
            if (brightness === undefined) continue;

            const visible = props.invertWireframe
              ? brightness < props.threshold
              : brightness > props.threshold;
            if (!visible) continue;

            const shadeIndex = p.constrain(
              Math.floor(
                p.map(brightness, 0, 255, 0, palette.length - 1),
              ),
              0,
              palette.length - 1,
            );
            let strokeSize = p.map(
              brightness,
              0,
              255,
              props.minStroke,
              props.maxStroke,
            );
            if (props.magnifierEnabled && d < props.magnifierRadius) {
              strokeSize *= p.map(d, 0, props.magnifierRadius, 2, 1);
            }
            const color = palette[shadeIndex];
            if (!color) continue;
            p.stroke(color);
            p.strokeWeight(strokeSize);
            p.point(x, y);
          }
        };
      };

      const instance = new P5(sketch, containerRef.current);
      p5InstanceRef.current = instance;

      observer = new ResizeObserver(() => {
        instance.windowResized();
      });
      observer.observe(containerRef.current);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      p5InstanceRef.current?.remove();
      p5InstanceRef.current = null;
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`relative h-full w-full overflow-hidden bg-black [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full ${className}`}
    >
      {error ? (
        <p className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.18em] text-nx-red/70 uppercase">
          {error}
        </p>
      ) : null}
    </div>
  );
}
