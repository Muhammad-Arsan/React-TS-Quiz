import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import "./App.css";
import { Difficulty, fetchQuestions, QuestionState } from "./Api";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log("QUESTIONs", questions);
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      // console.log("check answer:",answer)
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((pre) => [...pre, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion == TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h4 className="text-center mt-3">React-Quiz</h4>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startQuiz} className="btn btn-primary mt-3 px-4">
          Start
        </button>
      ) : null}
      {!gameOver ? (
        <div
          className="d-flex justify-content-start m-4 p-2 bg-success "
          style={{ width: "15%", borderRadius: "5px" }}
        >
          <p className="text-white ">Score: {score}</p>
        </div>
      ) : null}
      {loading && <p>loading...</p>}

      {!loading && !gameOver && (
        <QuestionCard
          totalQuestion={TOTAL_QUESTIONS}
          questionNo={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number != TOTAL_QUESTIONS - 1 ? (
        <button onClick={nextQuestion} className="btn btn-primary">
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
