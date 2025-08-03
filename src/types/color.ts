export interface Color {
  hue: number;
  saturation: number;
  lightness: number;
  hex: string;
}

export interface ColorPosition {
  x: number;
  y: number;
}

export interface AnalogousColorSet {
  primary: Color;
  secondary: Color[];
  complementary?: Color;
}

// Utility functions for color conversion
export const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

export const getAnalogousColors = (baseColor: Color, spread: number = 30): Color[] => {
  const analogous: Color[] = [];
  
  // Generate analogous colors by shifting hue
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue; // Skip the base color
    
    const newHue = (baseColor.hue + (i * spread) + 360) % 360;
    const newColor: Color = {
      hue: newHue,
      saturation: baseColor.saturation,
      lightness: baseColor.lightness,
      hex: hslToHex(newHue, baseColor.saturation, baseColor.lightness)
    };
    analogous.push(newColor);
  }
  
  return analogous;
};
