import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Global event listeners for mouse up and move
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const handleGlobalTouchEnd = () => handleMouseUp();

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative h-96 bg-gray-100 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Before Image (full width) */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          {beforeLabel}
        </div>
        <img
          src={beforeImage}
          alt="Original photo"
          className="comparison-image"
          draggable={false}
        />
      </div>

      {/* After Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          {afterLabel}
        </div>
        <img
          src={afterImage}
          alt="Enhanced photo"
          className="comparison-image"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
            <ArrowLeftRight className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/50 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      />
    </div>
  );
}
