import { useState } from 'react'
import ColorWheel from './components/ColorWheel'
import ColorDisplay from './components/ColorDisplay'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <header className="relative z-10 p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Analogous Color Wheel
          </h1>
          <p className="hidden lg:block text-xl md:text-2xl font-light text-slate-300 opacity-90">
            Click or drag to explore harmonious color combinations
          </p>
        </div>
        </h1>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 py-8">
        <div className="flex flex-col xl:flex-row items-start justify-center gap-8 max-w-7xl mx-auto">

          {/* Color Wheel Section */}
          <div className="w-full xl:w-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20 max-w-md mx-auto hover:bg-white/10 transition-all duration-500">
              <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                Interactive Color Wheel
              </h2>
              <div className="w-full aspect-square max-w-[350px] mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
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
      <footer className="relative z-10 p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
          <p className="text-slate-400 font-light">
            Built with <span className="text-blue-400">React</span>, <span className="text-blue-400">TypeScript</span>, <span className="text-green-400">Vite</span>, and <span className="text-cyan-400">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
