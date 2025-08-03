import { useState } from 'react'
import ColorWheel from './components/ColorWheel'
import ColorDisplay from './components/ColorDisplay'
import ThemeToggle from './components/ThemeToggle'
import type { Color } from './types/color'

function App() {
  const [selectedColor, setSelectedColor] = useState<Color>({
    hue: 0,
    saturation: 100,
    lightness: 50,
    hex: '#ff0000'
  })

  const [analogousColors, setAnalogousColors] = useState<Color[]>([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      {/* Header */}
      <header className="p-6 text-center relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="hidden lg:block text-2xl md:text-3xl font-normal text-gray-600 dark:text-gray-400">
          Click or click and drag to explore harmonious color combinations
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="flex flex-col xl:flex-row items-start justify-center gap-2 max-w-5xl mx-auto">

          {/* Color Wheel Section */}
          <div className="w-full xl:w-auto">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 max-w-md mx-auto shadow-lg">
              <h2 className="text-xl font-medium mb-4 text-center text-gray-800 dark:text-gray-100">Interactive Color Wheel</h2>
              <div className="w-full aspect-square max-w-[350px] mx-auto">
                <ColorWheel
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                  onAnalogousColorsChange={setAnalogousColors}
                />
              </div>
            </div>
          </div>

          {/* Color Display Section */}
          <div className="w-full xl:w-auto">
            <ColorDisplay
              selectedColor={selectedColor}
              analogousColors={analogousColors}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 dark:text-gray-400">
        <p>Built with React, TypeScript, Vite, and Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
