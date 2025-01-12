import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setGameActive } from './store/typingSlice';
import { RootState } from './store';
import { GameTimer } from './components/game/GameTimer';
import { ScoreDisplay } from './components/score/ScoreDisplay';
import { GameModeSelector } from './components/game/GameModeSelector';
import { TypingField } from './components/game/TypingField';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isGameActive = useSelector((state: RootState) => state.typing.isGameActive);

  const handleStartGame = () => {
    dispatch(setGameActive(true));
  };

  const handleResetGame = () => {
    dispatch(setGameActive(false));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          タイピング練習
        </Typography>
        
        <GameTimer />
        <ScoreDisplay />
        <GameModeSelector />
        <TypingField />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
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
    </Container>
  );
}

export default App; 