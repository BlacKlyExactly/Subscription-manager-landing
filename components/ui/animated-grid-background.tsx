"use client";

import { useShader } from '@/hooks/use-shader';

const SHADER = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec3 iBg;
  uniform vec3 iFg;
  uniform vec3 iPrimary;
  uniform int isDark;

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float d = max(abs(uv.x), abs(uv.y));
    float ring = 0.5 + 0.5 * cos(7.0 * d - iTime * 3.0);

    vec3 color = mix(iFg, iPrimary, ring);
    vec2 grid = fract(uv * 12.0);

    float w = isDark == 1 ? 0.005 : 0.0065;

    float border =
      step(grid.x, w) +
      step(1.0 - w, grid.x) +
      step(grid.y, w) +
      step(1.0 - w, grid.y);

    border = clamp(border, 0.0, 1.0);

    float baseOpacity = isDark == 1 ? 0.4 : 0.1;
    float ringOpacity = isDark == 1 ? 1.0 : 0.6;
    float opacity = mix(baseOpacity, ringOpacity, ring);

    fragColor = border * vec4(color, opacity);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

export function AnimatedGrid() {
  const ref = useShader(SHADER);

  return (
    <div
      ref={ref}
      className="absolute -z-1 w-screen h-[50rem] top-0 left-0"
      style={{ position: 'absolute' }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,var(--background))] bg-background" />
    </div>
  );
}
