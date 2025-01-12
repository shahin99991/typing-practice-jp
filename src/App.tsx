import { Box, Container, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { setGameActive, resetGame, setTargetText } from './store/typingSlice'
import TypingField from './components/typing/TypingField'
import GameModeSelector from './components/game/GameModeSelector'
import ScoreDisplay from './components/score/ScoreDisplay'
import GameTimer from './components/game/GameTimer'
import GameResultDialog from './components/game/GameResultDialog'
import useTypingGame from './hooks/useTypingGame'

// サンプルのタイピング問題
const sampleTexts = {
  beginner: [
    'こんにちは',
    'おはようございます',
    'さようなら',
  ],
  intermediate: [
    '今日はとても良い天気です',
    '私は日本語を勉強しています',
    'タイピングの練習は楽しいです',
  ],
  advanced: [
    '私たちは日々新しいことを学びながら成長していきます',
    '技術の進歩は私たちの生活を大きく変えていきました',
    '効率的なタイピングは仕事の生産性を向上させます',
  ],
}

function App() {
  const dispatch = useDispatch()
  const { isGameActive, difficulty } = useSelector(
    (state: RootState) => state.typing
  )
  const { showResult, handleCloseResult, score } = useTypingGame()

  const handleStartGame = () => {
    const texts = sampleTexts[difficulty]
    const randomText = texts[Math.floor(Math.random() * texts.length)]
    dispatch(setTargetText(randomText))
    dispatch(setGameActive(true))
  }

  const handleResetGame = () => {
    dispatch(resetGame())
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          タイピング練習
        </Typography>
        
        <GameModeSelector />
        <GameTimer />
        <ScoreDisplay />
        <TypingField />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartGame}
            disabled={isGameActive}
            size="large"
          >
            開始
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetGame}
            disabled={!isGameActive}
            size="large"
          >
            リセット
          </Button>
        </Box>
      </Box>

      <GameResultDialog
        open={showResult}
        onClose={handleCloseResult}
        score={score}
      />
    </Container>
  )
}

export default App 