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
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }`}>
      {/* Header */}
      <header className="p-6 text-center relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className={`hidden lg:block text-2xl md:text-3xl font-normal ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Click or click and drag to explore harmonious color combinations
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="flex flex-col xl:flex-row items-start justify-center gap-2 max-w-5xl mx-auto">

          {/* Color Wheel Section */}
          <div className="w-full xl:w-auto">
            <div className={`backdrop-blur-sm rounded-xl p-4 border max-w-md mx-auto shadow-xl ${
              theme === 'dark' 
                ? 'bg-gray-800/95 border-gray-700' 
                : 'bg-white/90 border-white/50 shadow-blue-200/50'
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
      <footer className={`p-6 text-center ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <p>Built with React, TypeScript, Vite, and Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
