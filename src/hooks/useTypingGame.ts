import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  setGameActive,
  resetGame,
  setCurrentText,
  setTargetText,
  incrementCorrectCount,
} from '../store/typingSlice'

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
}

export const useTypingGame = () => {
  const dispatch = useDispatch()
  const [showResult, setShowResult] = useState(false)
  const {
    currentText,
    targetText,
    isGameActive,
    gameMode,
    difficulty,
    correctCount,
  } = useSelector((state: RootState) => state.typing)

  // 新しい問題を設定する関数
  const setNextProblem = () => {
    const texts = sampleTexts[difficulty]
    const currentIndex = texts.indexOf(targetText)
    let nextIndex = (currentIndex + 1) % texts.length
    
    // 同じ問題が連続しないようにする
    if (texts.length > 1 && nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % texts.length
    }
    
    // 先に入力テキストをクリア
    dispatch(setCurrentText(''))
    // 少し遅延させて次の問題を設定
    setTimeout(() => {
      dispatch(setTargetText(texts[nextIndex]))
    }, 100)
  }

  useEffect(() => {
    if (!isGameActive || !targetText) return

    // ゲーム終了判定と次の問題設定
    if (currentText === targetText) {
      dispatch(incrementCorrectCount())
      if (gameMode === 'endless' || gameMode === 'scoreAttack') {
        // エンドレスモードとスコアアタックモードは次の問題へ
        setTimeout(() => {
          setNextProblem()
        }, 500) // 0.5秒後に次の問題を表示
      } else if (gameMode === 'timeAttack') {
        // タイムアタックモードでも次の問題へ（制限時間内）
        setTimeout(() => {
          setNextProblem()
        }, 500)
      }
    }
  }, [currentText, targetText, isGameActive, gameMode, difficulty, dispatch])

  // ゲームの状態が変更されたときの処理
  useEffect(() => {
    // ゲームが非アクティブになった時（時間切れ）にスコアを表示
    if (!isGameActive && gameMode === 'timeAttack') {
      setShowResult(true)
    }
  }, [isGameActive, gameMode])

  const handleGameReset = () => {
    dispatch(resetGame())
  }

  const handleCloseResult = () => {
    setShowResult(false)
  }

  return {
    handleGameReset,
    setNextProblem,
    showResult,
    handleCloseResult,
    score: {
      correctCount,
    },
  }
}

export default useTypingGame 