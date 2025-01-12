import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootState } from '../../store';

export const ScoreDisplay: React.FC = () => {
  const correctCount = useSelector((state: RootState) => state.typing.correctCount);

  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Typography variant="h5" color="primary">
        正解数: {correctCount}
      </Typography>
    </Box>
  );
}; 