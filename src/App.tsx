import { useState } from 'react'
import { useTheme } from './contexts/ThemeContext'
import ColorWheel from './components/ColorWheel'
import ColorDisplay from './components/ColorDisplay'
import ThemeToggle from './components/ThemeToggle'
import type { Color } from './types/color'

function App() {
  const { theme } = useTheme()
  const [selectedColor, setSelectedColor] = useState<Color>({
    hue: 0,
    saturation: 100,
    lightness: 50,
    hex: '#ff0000'
  })

  const [analogousColors, setAnalogousColors] = useState<Color[]>([])

  // Debug logging
  console.log('App component theme:', theme)

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-zinc-50 to-grey-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className="pt-8 pb-6 px-6 text-center relative">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <h1 className={`hidden lg:block text-2xl md:text-3xl font-normal mt-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Click to explore harmonious color combinations
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 pt-6 pb-8">
        <div className="flex flex-col xl:flex-row items-start justify-center gap-2 max-w-5xl mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Desktop Layout (xl and above) */}
          <div className="hidden xl:flex items-start justify-center gap-2">
            {/* Left Column - Color Wheel + Palette + Tips */}
            <div className="w-auto">
              {/* Color Wheel */}
              <div className="mb-2">
                <div className={`backdrop-blur-sm rounded-xl p-4 border max-w-md mx-auto shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/95 border-gray-700' 
                    : 'bg-white/90 border-zinc-200 shadow-zinc-200'
                }`}>
                  <h2 className={`text-xl font-medium mb-4 text-center ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}>Analogical Color Wheel</h2>
                  <div className="w-full aspect-square max-w-[350px] mx-auto">
                    <ColorWheel
                      selectedColor={selectedColor}
                      onColorChange={setSelectedColor}
                      onAnalogousColorsChange={setAnalogousColors}
                    />
                  </div>
                </div>
              </div>

              {/* Color Palette and Usage Tips - Desktop */}
              {analogousColors.length > 0 && (
                <div className="space-y-2">
                  {/* Color Palette Preview */}
                  <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl max-w-md mx-auto ${
                    theme === 'dark' 
                      ? 'bg-gray-800/95 border-gray-700' 
                      : 'bg-white/90 border-zinc-200 shadow-zinc-200'
                  }`}>
                    <h2 className={`text-2xl font-semibold mb-4 text-center ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                    }`}>Color Palette</h2>
                    <div className={`flex rounded-lg overflow-hidden shadow-lg border ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                    }`}>
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
                        navigator.clipboard.writeText(palette);
                      }}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Copy Palette (Hex Values)
                    </button>
                  </div>

                  {/* Usage Tips */}
                  <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl max-w-md mx-auto ${
                    theme === 'dark' 
                      ? 'bg-gray-800/95 border-gray-700' 
                      : 'bg-white/90 border-zinc-200 shadow-zinc-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                    }`}>💡 Usage Tips</h3>
                    <ul className={`text-sm space-y-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <li>• Click and drag on the color wheel to select colors</li>
                      <li>• Click any color value to copy it to clipboard</li>
                      <li>• Analogous colors are naturally harmonious</li>
                      <li>• Use these colors for gradients and themes</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Selected Color + Analogous Colors */}
            <div className="w-auto">
              <ColorDisplay
                selectedColor={selectedColor}
                analogousColors={analogousColors}
              />
            </div>
          </div>

          {/* Mobile Layout (below xl) */}
          <div className="xl:hidden space-y-2">
            {/* Color Wheel */}
            <div className={`backdrop-blur-sm rounded-xl p-4 border max-w-md mx-auto shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-800/95 border-gray-700' 
                : 'bg-white/90 border-zinc-200 shadow-zinc-200'
            }`}>
              <h2 className={`text-xl font-medium mb-4 text-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>Interactive Color Wheel</h2>
              <div className="w-full aspect-square max-w-[350px] mx-auto">
                <ColorWheel
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                  onAnalogousColorsChange={setAnalogousColors}
                />
              </div>
            </div>

            {/* Selected Color + Analogous Colors */}
            <ColorDisplay
              selectedColor={selectedColor}
              analogousColors={analogousColors}
            />

            {/* Color Palette and Usage Tips - Mobile */}
            {analogousColors.length > 0 && (
              <div className="space-y-2">
                {/* Color Palette Preview */}
                <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl max-w-md mx-auto ${
                  theme === 'dark' 
                    ? 'bg-gray-800/95 border-gray-700' 
                    : 'bg-white/90 border-zinc-200 shadow-zinc-200'
                }`}>
                  <h2 className={`text-2xl font-semibold mb-4 text-center ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}>Color Palette</h2>
                  <div className={`flex rounded-lg overflow-hidden shadow-lg border ${
                    theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                  }`}>
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
                      navigator.clipboard.writeText(palette);
                    }}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Copy Palette (Hex Values)
                  </button>
                </div>

                {/* Usage Tips */}
                <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-xl max-w-md mx-auto ${
                  theme === 'dark' 
                    ? 'bg-gray-800/95 border-gray-700' 
                    : 'bg-white/90 border-zinc-200 shadow-zinc-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}>💡 Usage Tips</h3>
                  <ul className={`text-sm space-y-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <li>• Click and drag on the color wheel to select colors</li>
                    <li>• Click any color value to copy it to clipboard</li>
                    <li>• Analogous colors are naturally harmonious</li>
                    <li>• Use these colors for gradients and themes</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Color Palette and Usage Tips - Only show when analogous colors exist */}
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-auto px-6 py-6 pb-3 text-center ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
      }`}>
        <p>
          Built by{' '}
          <a 
            href="https://loadofpixels.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-semibold text-zinc-500 underline transition-colors ${
              theme === 'dark' 
                ? 'text-gray-200 hover:text-white' 
                : 'text-gray-800 hover:text-black'
            }`}
          >
            Load of pixels
          </a>{' '}
          using React, TypeScript, Vite, and Tailwind CSS
        </p>
      </footer>
    </div>
  )
}

export default App
