import { useEffect, useRef, useState } from 'react'
import { Box, TextField, Typography, Fade } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setCurrentText } from '../../store/typingSlice'
import useTypingGame from '../../hooks/useTypingGame'

const TypingField = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const { currentText, targetText, isGameActive } = useSelector(
    (state: RootState) => state.typing
  )

  useTypingGame()

  useEffect(() => {
    dispatch(setCurrentText(''))
    if (inputRef.current) {
      inputRef.current.blur()
      setTimeout(() => {
        if (isGameActive && inputRef.current) {
          inputRef.current.focus()
        }
      }, 10)
    }
  }, [targetText, dispatch, isGameActive])

  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isGameActive])

  useEffect(() => {
    if (currentText === targetText && targetText !== '') {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentText, targetText])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch(setCurrentText(value))
  }

  const renderTargetText = () => {
    return targetText.split('').map((char, index) => {
      let color = 'text.secondary'
      if (index < currentText.length) {
        color = currentText[index] === char ? 'success.main' : 'error.main'
      }
      return (
        <Typography
          key={index}
          component="span"
          sx={{
            color,
            fontFamily: 'monospace',
            fontSize: '1.5rem',
          }}
        >
          {char}
        </Typography>
      )
    })
  }

  return (
    <Box sx={{ width: '100%', mb: 4, position: 'relative' }}>
      <Box
        sx={{
          mb: 2,
          minHeight: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
        }}
      >
        {renderTargetText()}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        value={currentText}
        onChange={handleInputChange}
        inputRef={inputRef}
        disabled={!isGameActive}
        inputProps={{
          style: { fontFamily: 'monospace', fontSize: '1.2rem' },
          'ime-mode': 'active',
        }}
        placeholder="ここにタイプしてください"
        onBlur={() => {
          if (inputRef.current) {
            inputRef.current.value = ''
          }
        }}
      />
      <Fade in={showSuccess}>
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'success.main',
            fontWeight: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 16px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Good!
        </Typography>
      </Fade>
    </Box>
  )
}

export default TypingField 