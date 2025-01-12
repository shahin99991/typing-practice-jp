import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { resetGame } from '../../store/typingSlice'

interface GameResultDialogProps {
  open: boolean
  onClose: () => void
  score: {
    correctCount: number
  }
}

const GameResultDialog = ({ open, onClose, score }: GameResultDialogProps) => {
  const dispatch = useDispatch()

  const handleRetry = () => {
    dispatch(resetGame())
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>タイムアップ！</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" gutterBottom>
            結果
          </Typography>
          <Typography variant="h4" sx={{ mt: 2, color: 'primary.main' }}>
            正解数: {score.correctCount} 問
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} color="primary">
          閉じる
        </Button>
        <Button onClick={handleRetry} variant="contained" color="primary">
          もう一度挑戦
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GameResultDialog 