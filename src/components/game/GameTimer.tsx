import { useEffect, useState } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { setGameActive } from '../../store/typingSlice'

const GAME_TIME = 60 // 60秒

const GameTimer = () => {
  const dispatch = useDispatch()
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const { isGameActive, gameMode } = useSelector((state: RootState) => state.typing)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isGameActive && gameMode === 'timeAttack') {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // 時間切れの場合
            if (timer) clearInterval(timer)
            dispatch(setGameActive(false))
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else {
      setTimeLeft(GAME_TIME)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isGameActive, gameMode, dispatch])

  // プログレスバーの色を残り時間に応じて変更
  const getColor = () => {
    if (timeLeft > 30) return 'primary'
    if (timeLeft > 10) return 'warning'
    return 'error'
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Typography variant="h6" color={getColor()}>
          残り時間: {timeLeft}秒
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / GAME_TIME) * 100}
        color={getColor()}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  )
}

export default GameTimer 