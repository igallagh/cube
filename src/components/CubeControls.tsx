import React from 'react';
import { Shuffle, RotateCcw, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCubeStore from '@/hooks/useCubeStore';
export function CubeControls() {
  const isSpinning = useCubeStore((s) => s.isSpinning);
  const isAnimating = useCubeStore((s) => s.isAnimating);
  const isSolved = useCubeStore((s) => s.isSolved);
  const toggleSpin = useCubeStore((s) => s.toggleSpin);
  const scramble = useCubeStore((s) => s.scramble);
  const reset = useCubeStore((s) => s.reset);
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-8 md:pb-12 z-10">
      <div className="flex items-center justify-center gap-4 p-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700">
        <Button
          variant="outline"
          size="lg"
          onClick={scramble}
          disabled={isAnimating}
          className="bg-transparent text-white border-white/50 hover:bg-indigo-500/20 hover:text-white hover:border-indigo-400 transition-all duration-200"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Scramble
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={reset}
          disabled={isAnimating || isSolved}
          className="bg-transparent text-white border-white/50 hover:bg-indigo-500/20 hover:text-white hover:border-indigo-400 transition-all duration-200"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSpin}
          disabled={isAnimating}
          className="bg-transparent text-white border-white/50 hover:bg-indigo-500/20 hover:text-white hover:border-indigo-400 transition-all duration-200 rounded-full w-12 h-12"
        >
          {isSpinning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}