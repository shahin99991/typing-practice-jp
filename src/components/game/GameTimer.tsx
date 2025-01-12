import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, LinearProgress, Typography } from '@mui/material';
import { setGameActive } from '../../store/typingSlice';
import { RootState } from '../../store';

const GAME_TIME = 60; // 60秒

export const GameTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const isGameActive = useSelector((state: RootState) => state.typing.isGameActive);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer: number | undefined;

    if (isGameActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            dispatch(setGameActive(false));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isGameActive, timeLeft, dispatch]);

  useEffect(() => {
    if (!isGameActive) {
      setTimeLeft(GAME_TIME);
    }
  }, [isGameActive]);

  const progress = (timeLeft / GAME_TIME) * 100;
  const getColor = () => {
    if (timeLeft > 30) return 'primary';
    if (timeLeft > 10) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        残り時間: {timeLeft}秒
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={getColor()}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}; 