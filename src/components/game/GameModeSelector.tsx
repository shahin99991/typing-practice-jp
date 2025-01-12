import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setDifficulty } from '../../store/typingSlice';
import { RootState } from '../../store';

export const GameModeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.typing.difficulty);
  const isGameActive = useSelector((state: RootState) => state.typing.isGameActive);

  const handleDifficultyChange = (event: any) => {
    if (!isGameActive) {
      dispatch(setDifficulty(event.target.value));
    }
  };

  return (
    <Box sx={{ minWidth: 200, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="difficulty-select-label">難易度</InputLabel>
        <Select
          labelId="difficulty-select-label"
          id="difficulty-select"
          value={difficulty}
          label="難易度"
          onChange={handleDifficultyChange}
          disabled={isGameActive}
        >
          <MenuItem value="beginner">初級</MenuItem>
          <MenuItem value="intermediate">中級</MenuItem>
          <MenuItem value="advanced">上級</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}; 