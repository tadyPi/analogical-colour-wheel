import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { Color } from '../types/color';

interface ColorDisplayProps {
  selectedColor: Color;
  analogousColors: Color[];
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ selectedColor, analogousColors }) => {
  const { theme } = useTheme();
  
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
    <div className={`rounded-xl p-4 border transition-all shadow-sm ${
      theme === 'dark' 
        ? 'bg-gray-700/95 border-gray-600 hover:border-gray-500' 
        : 'bg-white/80 border-gray-300 hover:border-gray-400'
    } ${isMain ? (theme === 'dark' ? 'ring-2 ring-blue-400' : 'ring-2 ring-blue-500') : ''}`}>
      <div className="flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded-lg border-2 shadow-lg cursor-pointer transition-transform hover:scale-105 ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
          }`}
          style={{ backgroundColor: color.hex }}
          onClick={() => copyToClipboard(color.hex)}
          title="Click to copy hex value"
        />
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>{label}</h3>
          <div className="space-y-1 text-sm">
            <button
              onClick={() => copyToClipboard(color.hex)}
              className={`block w-full text-left transition-colors font-mono text-xs ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-gray-100' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Click to copy"
            >
              HEX: {color.hex}
            </button>
            <button
              onClick={() => copyToClipboard(formatHsl(color))}
              className={`block w-full text-left transition-colors font-mono text-xs ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-gray-100' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
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
      <div className={`backdrop-blur-sm rounded-xl p-4 border shadow-xl max-w-md mx-auto xl:max-w-none ${
        theme === 'dark' 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/90 border-zinc-200 shadow-zinc-200'
      }`}>
        <h2 className={`text-2xl font-semibold mb-4 text-center ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>Selected Color</h2>
        <ColorSwatch color={selectedColor} label="Primary Color" isMain />
      </div>

      {/* Analogous Colors */}
      {analogousColors.length > 0 && (
        <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl max-w-md mx-auto xl:max-w-none ${
          theme === 'dark' 
            ? 'bg-gray-800/95 border-gray-700' 
            : 'bg-white/90 border-zinc-200 shadow-zinc-200'
        }`}>
          <h2 className={`text-2xl font-semibold mb-4 text-center ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>Analogous Colors</h2>
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
    </div>
  );
};

export default ColorDisplay;
