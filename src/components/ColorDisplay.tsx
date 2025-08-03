import React from 'react';
import type { Color } from '../types/color';

interface ColorDisplayProps {
  selectedColor: Color;
  analogousColors: Color[];
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ selectedColor, analogousColors }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatHsl = (color: Color) => {
    return `hsl(${Math.round(color.hue)}, ${Math.round(color.saturation)}%, ${Math.round(color.lightness)}%)`;
  };

  const ColorSwatch: React.FC<{ color: Color; label: string; isMain?: boolean }> = ({
    color,
    label,
    isMain = false
  }) => (
    <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 ${isMain ? 'ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/20' : ''}`}>
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-2xl border-3 border-white/30 shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-white/50 relative overflow-hidden group"
          style={{ backgroundColor: color.hex }}
          onClick={() => copyToClipboard(color.hex)}
          title="Click to copy hex value"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white mb-3 text-lg">{label}</h3>
          <div className="space-y-2 text-sm">
            <button
              onClick={() => copyToClipboard(color.hex)}
              className="block w-full text-left text-slate-300 hover:text-white transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg font-mono"
              title="Click to copy"
            >
              <span className="text-slate-400">HEX:</span> <span className="font-semibold">{color.hex}</span>
            </button>
            <button
              onClick={() => copyToClipboard(formatHsl(color))}
              className="block w-full text-left text-slate-300 hover:text-white transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-lg font-mono"
              title="Click to copy"
            >
              <span className="text-slate-400">HSL:</span> <span className="font-semibold">{formatHsl(color)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Selected Color */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Selected Color
        </h2>
        <ColorSwatch color={selectedColor} label="Primary Color" isMain />
      </div>

      {/* Analogous Colors */}
      {analogousColors.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Analogous Colors
          </h2>
          <div className="space-y-6">
            {analogousColors.map((color, index) => (
              <ColorSwatch
                key={index}
                color={color}
                label={`Harmony ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color Palette Preview */}
      {analogousColors.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Color Palette
          </h2>
          <div className="flex rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:shadow-3xl transition-shadow duration-300">
            <div
              className="flex-1 h-24 transition-all duration-300 hover:scale-105 hover:z-10 relative"
              style={{ backgroundColor: analogousColors[0]?.hex }}
            />
            <div
              className="flex-1 h-24 transition-all duration-300 hover:scale-105 hover:z-10 relative"
              style={{ backgroundColor: analogousColors[1]?.hex }}
            />
            <div
              className="flex-1 h-24 transition-all duration-300 hover:scale-105 hover:z-10 relative border-2 border-white/30"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div
              className="flex-1 h-24 transition-all duration-300 hover:scale-105 hover:z-10 relative"
              style={{ backgroundColor: analogousColors[2]?.hex }}
            />
            <div
              className="flex-1 h-24 transition-all duration-300 hover:scale-105 hover:z-10 relative"
              style={{ backgroundColor: analogousColors[3]?.hex }}
            />
          </div>
          <button
            onClick={() => {
              const palette = [
                analogousColors[0]?.hex,
                analogousColors[1]?.hex,
                selectedColor.hex,
                analogousColors[2]?.hex,
                analogousColors[3]?.hex
              ].filter(Boolean).join(', ');
              copyToClipboard(palette);
            }}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0"
          >
            📋 Copy Complete Palette
          </button>
        </div>
      )}

      {/* Usage Tips */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          💡 Usage Tips
        </h3>
        <ul className="text-slate-300 space-y-4">
          <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
            <span className="text-blue-400 font-bold">•</span>
            <span>Click and drag on the color wheel to select colors</span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
            <span className="text-green-400 font-bold">•</span>
            <span>Click any color value to copy it to clipboard</span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
            <span className="text-purple-400 font-bold">•</span>
            <span>Analogous colors are naturally harmonious</span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
            <span className="text-pink-400 font-bold">•</span>
            <span>Use these colors for gradients and themes</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorDisplay;
