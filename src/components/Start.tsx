import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import "../App.css";
import { data } from "./Categories";
import { shuffleArray } from "../Utils";
import { number as numbers } from "./data";
import { NavLink, useNavigate } from "react-router-dom";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Question & { answers: string[] };

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Start: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  let navigate = useNavigate();
  // console.log("QUESTIONs", questions);
  const startQuiz = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setGameOver(false);

    setQuestions(
      data?.data.results?.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }))
    );
    // console.log("start-data-length", data.results.length);

    setScore(0);
    setUserAnswers([]);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      // console.log("startcomponent", answer);

      // console.log("check answer:",answer)
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
        document.getElementById(`${answer}`)!.style.color = "green";
      } else if (!correct) {
        document.getElementById(`${answer}`)!.style.color = "red";
        document.getElementById(
          `${questions[number].correct_answer}`
        )!.style.color = "green";
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

  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextQuestion = number + 1;
    if (nextQuestion === numbers) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  console.log("aaa", numbers);
  return (
    <div className="App">
      {gameOver ? (
        <button onClick={startQuiz} className="btn btn-primary mt-3 px-4">
          Start
        </button>
      ) : userAnswers.length === numbers ? (
        <NavLink to="/" className="btn btn-secondary">
          ReTake Quiz
        </NavLink>
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
          totalQuestion={numbers}
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
      number != numbers - 1 ? (
        <button onClick={nextQuestion} className="btn btn-primary">
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default Start;
