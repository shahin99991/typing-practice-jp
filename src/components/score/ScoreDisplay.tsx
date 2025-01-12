import { Box, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const ScoreDisplay = () => {
  const { wpm, accuracy } = useSelector((state: RootState) => state.typing)

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 2,
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h6" component="div">
          入力速度
        </Typography>
        <Typography variant="h4" component="div">
          {wpm} WPM
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 2,
          textAlign: 'center',
          backgroundColor: 'secondary.main',
          color: 'white',
        }}
      >
        <Typography variant="h6" component="div">
          正確性
        </Typography>
        <Typography variant="h4" component="div">
          {accuracy}%
        </Typography>
      </Paper>
    </Box>
  )
}

export default ScoreDisplay 