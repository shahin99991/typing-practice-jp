import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setGameMode, setDifficulty } from '../../store/typingSlice'

const GameModeSelector = () => {
  const dispatch = useDispatch()
  const { gameMode, difficulty, isGameActive } = useSelector(
    (state: RootState) => state.typing
  )

  const handleGameModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'timeAttack' | 'scoreAttack' | 'endless' | null
  ) => {
    if (newMode && !isGameActive) {
      dispatch(setGameMode(newMode))
    }
  }

  const handleDifficultyChange = (
    _: React.MouseEvent<HTMLElement>,
    newDifficulty: 'beginner' | 'intermediate' | 'advanced' | null
  ) => {
    if (newDifficulty && !isGameActive) {
      dispatch(setDifficulty(newDifficulty))
    }
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        ゲームモード
      </Typography>
      <ToggleButtonGroup
        value={gameMode}
        exclusive
        onChange={handleGameModeChange}
        disabled={isGameActive}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="timeAttack">タイムアタック</ToggleButton>
        <ToggleButton value="scoreAttack">スコアアタック</ToggleButton>
        <ToggleButton value="endless">エンドレス</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h6" gutterBottom>
        難易度
      </Typography>
      <ToggleButtonGroup
        value={difficulty}
        exclusive
        onChange={handleDifficultyChange}
        disabled={isGameActive}
      >
        <ToggleButton value="beginner">初級</ToggleButton>
        <ToggleButton value="intermediate">中級</ToggleButton>
        <ToggleButton value="advanced">上級</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

export default GameModeSelector 