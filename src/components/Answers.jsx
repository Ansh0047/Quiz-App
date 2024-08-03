import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // to shuffle the answers array in random order
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // if inner fucntion return +ve value then no sort else -ve value will sort the array
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        // this is used to highlight the selected answer
        if (answerState === "correct" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
