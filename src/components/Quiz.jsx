import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  // to the store the users answers and initially it is empty
  const [userAnswers, setUserAnswers] = useState([]);

  // to get the current question index from the users answers list as how many answers has been given by the user
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;      

  // to check if we are out of questions
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
      }, 1000);

      setTimeout(() => {
        setAnswerState('');
      },2000);
    },
    [activeQuestionIndex]
  ); // dependecy is there is as state value is there

  // here null represent that we haven't selected any option
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  // here we have added the function as a dependency bcoz when the component is executed again the function is recreated and it depends on the props and the state.

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="quiz complete logo" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // to shuffle the answers array in random order
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5); // if inner fucntion return +ve value then no sort else -ve value will sort the array

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => { 
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = '';
            // this is used to highlight the selected answer
            if(answerState === 'correct' && isSelected){
              cssClass = 'selected';
            }

            if((answerState === 'correct' || answerState === 'wrong') && isSelected){
              cssClass = answerState;
            }

            return (<li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                {answer}
              </button>
            </li>);
          })}
        </ul>
      </div>
    </div>
  );
}
