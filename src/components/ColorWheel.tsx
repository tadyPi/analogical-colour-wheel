import { useRef, useEffect, useState, useCallback } from 'react';
import type { Color, ColorPosition } from '../types/color';
import { hslToHex, getAnalogousColors } from '../types/color';

interface ColorWheelProps {
  selectedColor: Color;
  onColorChange: (color: Color) => void;
  onAnalogousColorsChange: (colors: Color[]) => void;
}

const ColorWheel: React.FC<ColorWheelProps> = ({
  selectedColor,
  onColorChange,
  onAnalogousColorsChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [wheelCenter, setWheelCenter] = useState<ColorPosition>({ x: 0, y: 0 });
  const [wheelRadius, setWheelRadius] = useState(0);

  const drawColorWheel = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const size = Math.min(canvas.width, canvas.height);
    const radius = size / 2 - 20;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    setWheelCenter({ x: centerX, y: centerY });
    setWheelRadius(radius);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = angle * Math.PI / 180;

      for (let r = 0; r < radius; r += 1) {
        const saturation = Math.min(100, (r / radius) * 100);
        const lightness = 50;
        const color = hslToHex(angle, saturation, lightness);

        ctx.beginPath();
        ctx.arc(centerX, centerY, r, startAngle, endAngle);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw selected color indicator
    drawColorIndicator(ctx, selectedColor, centerX, centerY, radius);
  }, [selectedColor]);

  const drawColorIndicator = (
    ctx: CanvasRenderingContext2D,
    color: Color,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    const angle = (color.hue * Math.PI) / 180;
    const distance = (color.saturation / 100) * radius;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    // Draw indicator circle
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw inner color circle
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = color.hex;
    ctx.fill();
  };

  const getColorFromPosition = (x: number, y: number): Color | null => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const canvasX = x - rect.left;
    const canvasY = y - rect.top;

    const dx = canvasX - wheelCenter.x;
    const dy = canvasY - wheelCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > wheelRadius) return null;

    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (angle < 0) angle += 360;

    const saturation = Math.min(100, (distance / wheelRadius) * 100);
    const lightness = 50;
    const hue = angle;

    return {
      hue,
      saturation,
      lightness,
      hex: hslToHex(hue, saturation, lightness),
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorFromPosition(e.clientX, e.clientY);
    if (color) {
      setIsDragging(true);
      onColorChange(color);
      onAnalogousColorsChange(getAnalogousColors(color));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const color = getColorFromPosition(e.clientX, e.clientY);
    if (color) {
      onColorChange(color);
      onAnalogousColorsChange(getAnalogousColors(color));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const size = Math.min(
      containerRect.width - 32, // Account for padding
      containerRect.height - 32,
      350 // Maximum size
    );

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawColorWheel(canvas, ctx);
  }, [drawColorWheel]);

  useEffect(() => {
    updateCanvasSize();
  }, [updateCanvasSize]);

  useEffect(() => {
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasSize]);

  return (
    <div className="flex justify-center items-center p-4 w-full h-full min-h-[320px]">
      <canvas
        ref={canvasRef}
        className="cursor-crosshair rounded-full shadow-2xl max-w-full max-h-full ring-4 ring-white/30 dark:ring-gray-600/50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default ColorWheel;