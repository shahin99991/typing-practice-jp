import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TypingState {
  currentText: string
  targetText: string
  gameMode: 'timeAttack' | 'scoreAttack' | 'endless'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isGameActive: boolean
  correctCount: number
}

const initialState: TypingState = {
  currentText: '',
  targetText: '',
  gameMode: 'timeAttack',
  difficulty: 'beginner',
  isGameActive: false,
  correctCount: 0,
}

export const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setCurrentText: (state, action: PayloadAction<string>) => {
      state.currentText = action.payload
    },
    setTargetText: (state, action: PayloadAction<string>) => {
      state.targetText = action.payload
    },
    setGameMode: (state, action: PayloadAction<TypingState['gameMode']>) => {
      state.gameMode = action.payload
    },
    setDifficulty: (state, action: PayloadAction<TypingState['difficulty']>) => {
      state.difficulty = action.payload
    },
    setGameActive: (state, action: PayloadAction<boolean>) => {
      state.isGameActive = action.payload
      if (!action.payload) {
        state.currentText = ''
      }
    },
    incrementCorrectCount: (state) => {
      state.correctCount += 1
    },
    resetGame: (state) => {
      state.currentText = ''
      state.isGameActive = false
      state.correctCount = 0
    },
  },
})

export const {
  setCurrentText,
  setTargetText,
  setGameMode,
  setDifficulty,
  setGameActive,
  incrementCorrectCount,
  resetGame,
} = typingSlice.actions

export default typingSlice.reducer 