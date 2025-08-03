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
    <div className={`bg-white/90 dark:bg-gray-700/80 rounded-xl p-4 border border-gray-200 dark:border-gray-500 transition-all hover:border-gray-300 dark:hover:border-gray-400 shadow-sm ${isMain ? 'ring-2 ring-blue-400 dark:ring-blue-400' : ''}`}>
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg border-2 border-white/20 shadow-lg cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: color.hex }}
          onClick={() => copyToClipboard(color.hex)}
          title="Click to copy hex value"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{label}</h3>
          <div className="space-y-1 text-sm">
            <button
              onClick={() => copyToClipboard(color.hex)}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              title="Click to copy"
            >
              HEX: {color.hex}
            </button>
            <button
              onClick={() => copyToClipboard(formatHsl(color))}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              title="Click to copy"
            >
              HSL: {formatHsl(color)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      {/* Selected Color */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Selected Color</h2>
        <ColorSwatch color={selectedColor} label="Primary Color" isMain />
      </div>

      {/* Analogous Colors */}
      {analogousColors.length > 0 && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Analogous Colors</h2>
          <div className="space-y-4">
            {analogousColors.map((color, index) => (
              <ColorSwatch
                key={index}
                color={color}
                label={`Analogous ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color Palette Preview */}
      {analogousColors.length > 0 && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Color Palette</h2>
          <div className="flex rounded-lg overflow-hidden shadow-lg">
            <div
              className="flex-1 h-20"
              style={{ backgroundColor: analogousColors[0]?.hex }}
            />
            <div
              className="flex-1 h-20"
              style={{ backgroundColor: analogousColors[1]?.hex }}
            />
            <div
              className="flex-1 h-20"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div
              className="flex-1 h-20"
              style={{ backgroundColor: analogousColors[2]?.hex }}
            />
            <div
              className="flex-1 h-20"
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
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Copy Palette (Hex Values)
          </button>
        </div>
      )}

      {/* Usage Tips */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">💡 Usage Tips</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <li>• Click and drag on the color wheel to select colors</li>
          <li>• Click any color value to copy it to clipboard</li>
          <li>• Analogous colors are naturally harmonious</li>
          <li>• Use these colors for gradients and themes</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorDisplay;
