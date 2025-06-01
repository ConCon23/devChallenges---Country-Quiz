import { useContext, useEffect } from "react";
import { Questions } from "./Questions";
import { QuizContext } from "../App";

export const Quiz = () => {
  const { score, 
          setSelectedQuestion, 
          questions,
          selectedQuestion,
          isAnswered,
          questionState  
        } = useContext(QuizContext);


  const handleSelectedQuestion = (index) => {
    setSelectedQuestion(index);
  }

  return (
    <div className="w-full mx-5 text-secondary-txt-clr">
        <div className="w-full mx-auto max-w-[800px] flex flex-col gap-9">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium tablet:text-2xl">Country Quiz</h1>
            <div>
              <h2 className="bg-primary-bg-clr font-medium py-1 px-3 rounded-3xl">{`${score}/${questions.length} Points`}</h2>
            </div>
          </div>
          <div className=" p-6 bg-quiz-background shadow rounded-lg">
              <div className="mx-auto flex flex-col gap-9 max-w-[500px] tablet:py-11">
                <div className="flex justify-center flex-wrap gap-2 ">
                    {questions.map((_, index) => {
                      let isSelected = index === selectedQuestion;
                      let isAnswered = questionState[index]?.isAnswered
                      return(
                        <button 
                        className={
                         `${isSelected ? "bg-primary-bg-clr" : "bg-quiz-btn-background"}
                          ${isAnswered ? "bg-primary-bg-clr" : "bg-quiz-btn-background"}
                          hover:bg-primary-bg-clr
                         h-9 w-9 font-medium bg-quiz-btn-background rounded-full`} 
                         onClick={() => {handleSelectedQuestion(index)}} key={index}>{index + 1}</button>
                      )
                    })}
                  </div>
                <Questions />
              </div>
            </div>
          </div>
      </div>
  );
};