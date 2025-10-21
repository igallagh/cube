import { create } from 'zustand';
type Move = { axis: 'x' | 'y' | 'z'; layer: number; direction: number };
type CubeStore = {
  isSpinning: boolean;
  isAnimating: boolean;
  isSolved: boolean;
  moves: Move[];
  history: Move[];
  toggleSpin: () => void;
  scramble: () => void;
  reset: () => void;
  addMove: (move: Move) => void;
  finishMove: () => void;
  setAnimating: (isAnimating: boolean) => void;
  setIsSolved: (isSolved: boolean) => void;
};
const useCubeStore = create<CubeStore>((set, get) => ({
  isSpinning: true,
  isAnimating: false,
  isSolved: true,
  moves: [],
  history: [],
  toggleSpin: () => set((state) => ({ isSpinning: !state.isSpinning })),
  scramble: () => {
    if (get().isAnimating) return;
    set({ isAnimating: true, isSpinning: false, isSolved: false });
    const scrambleMoves: Move[] = [];
    const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
    const layers = [-1, 0, 1];
    const directions = [-1, 1];
    for (let i = 0; i < 25; i++) {
      const axis = axes[Math.floor(Math.random() * 3)];
      const layer = layers[Math.floor(Math.random() * 3)];
      const direction = directions[Math.floor(Math.random() * 2)];
      scrambleMoves.push({ axis, layer, direction });
    }
    set({ moves: scrambleMoves, history: [] });
  },
  reset: () => {
    if (get().isAnimating || get().isSolved) return;
    set({ isAnimating: true, isSpinning: false });
    const history = get().history;
    const resetMoves = history.map(move => ({
      ...move,
      direction: -move.direction,
    })).reverse();
    set({ moves: resetMoves, history: [] });
  },
  addMove: (move) => {
    set((state) => ({ moves: [...state.moves, move] }));
  },
  finishMove: () => {
    const finishedMove = get().moves[0];
    if (finishedMove) {
      // Don't add reset moves to history
      if (!get().isAnimating || get().moves.length > 1) {
         set((state) => ({ history: [...state.history, finishedMove] }));
      }
    }
    set((state) => ({ moves: state.moves.slice(1) }));
  },
  setAnimating: (isAnimating) => set({ isAnimating }),
  setIsSolved: (isSolved) => set({ isSolved }),
}));
export default useCubeStore;