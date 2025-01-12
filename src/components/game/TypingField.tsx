import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, Typography } from '@mui/material';
import { setCurrentText, setTargetText, incrementCorrectCount } from '../../store/typingSlice';
import { RootState } from '../../store';

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
};

export const TypingField: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentText, targetText, isGameActive, difficulty } = useSelector(
    (state: RootState) => state.typing
  );

  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameActive]);

  useEffect(() => {
    if (isGameActive && !targetText) {
      const texts = sampleTexts[difficulty];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      dispatch(setTargetText(randomText));
    }
  }, [isGameActive, targetText, difficulty, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isGameActive) return;
    
    const newText = event.target.value;
    dispatch(setCurrentText(newText));

    if (newText === targetText) {
      dispatch(incrementCorrectCount());
      dispatch(setCurrentText(''));
      const texts = sampleTexts[difficulty];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      dispatch(setTargetText(randomText));
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom align="center" color="primary">
        {targetText}
      </Typography>
      <TextField
        fullWidth
        value={currentText}
        onChange={handleInputChange}
        disabled={!isGameActive}
        inputRef={inputRef}
        variant="outlined"
        placeholder={isGameActive ? "ここに入力してください" : "ゲームを開始してください"}
      />
    </Box>
  );
}; 