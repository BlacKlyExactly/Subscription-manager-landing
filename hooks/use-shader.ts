"use client";

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

type RGB = [number, number, number];

function getCssColor(variable: string): RGB {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable).trim();

  const tmp = document.createElement('div');
  tmp.style.color = raw;

  document.body.appendChild(tmp);

  const resolved = getComputedStyle(tmp).color;

  document.body.removeChild(tmp);

  const match = resolved.match(/\d+(\.\d+)?/g);
  if (!match) return [1, 1, 1];

  return [parseInt(match[0]) / 255, parseInt(match[1]) / 255, parseInt(match[2]) / 255];
}

export function useShader(fragment: string) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    el.appendChild(gl.canvas);
    gl.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%';

    const program = new Program(gl, {
      vertex: `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0, 1);
        }
      `,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [0, 0] },
        iBg: { value: getCssColor('--background') },
        iFg: { value: getCssColor('--foreground') },
        iPrimary: { value: getCssColor('--primary') },
        isDark: { value: document.documentElement.classList.contains('dark') ? 1 : 0 },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl) });
    mesh.program = program;

    const ro = new ResizeObserver(() => {
      renderer.setSize(el.offsetWidth, el.offsetHeight);
      program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height];
    });
    ro.observe(el);

    const mo = new MutationObserver(() => {
      program.uniforms.iBg.value = getCssColor('--background');
      program.uniforms.iFg.value = getCssColor('--foreground');
      program.uniforms.iPrimary.value = getCssColor('--primary');
      program.uniforms.isDark.value = document.documentElement.classList.contains('dark') ? 1 : 0;
    });

    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mo.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (el.contains(gl.canvas)) el.removeChild(gl.canvas);
    };
  }, [fragment]);

  return mountRef;
}
