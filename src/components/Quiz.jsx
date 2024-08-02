import { useCallback, useState} from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  // to the store the users answers and initially it is empty
  const [userAnswers, setUserAnswers] = useState([]);

  // to get the current question index from the users answers list as how many answers has been given by the user
  const activeQuestionIndex = userAnswers.length;

  // to check if we are out of questions
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer =  useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);    // no dependecy as there is no state or prop value is there
  
  // here null represent that we haven't selected any option
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);  
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
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer()}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
