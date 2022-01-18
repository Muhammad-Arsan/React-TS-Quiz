import React from "react";
import { AnswerObject } from "../App";
type Props = {
  totalQuestion: number;
  questionNo: number;
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuestionCard: React.FC<Props> = ({
  totalQuestion,
  questionNo,
  question,
  answers,
  userAnswer,
  callback,
}) => {
  console.log("User Answer:", userAnswer);
  return (
    <div className=" row col-md-12">
      <p className="number fs-4">
        Question: {questionNo}/ {totalQuestion}
      </p>
      <div className="row justify-content-center">
        <div className="col-md-3 bg-warning align-items-center question_div p-2">
          <p
            dangerouslySetInnerHTML={{ __html: question }}
            className="text-white"
          />
        </div>
      </div>
      <div>
        {answers.map((answer) => (
          <div key={answer} className="main_answer_div">
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              className="answer"
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
