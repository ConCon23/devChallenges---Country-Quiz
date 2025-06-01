import  Axios  from "axios";
import { useQuery } from "@tanstack/react-query";
import { generateQuestion } from "./generateQuestion";
import {useEffect, useContext, useState } from "react";
import { QuizContext } from "../App";
export const Questions = () => {
    
    const {selectedQuestion,
        score, setScore, 
        isAnswered, setIsAnswered,
        selectedOption, setSelectedOption,
        questionState, setQuestionState,
        setQuestions } = useContext(QuizContext) 
        
    const {data, isLoading, isError} = useQuery({
        queryKey: ["question"],
        queryFn: generateQuestion
    });

    useEffect(() => {
        if (data) setQuestions(data);
    }, [data]);


    useEffect(() => {
        const currentState = questionState[selectedQuestion] || {};
        setSelectedOption(currentState.selectedOption);
        setIsAnswered(currentState.isAnswered);
        console.log(Object.keys(questionState).length)
    }, [selectedQuestion, questionState]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load</p>;
    
        //Event Handler for the selected Option
    const handleOption = (selectedOpt) => {
        let isCorrect = selectedOpt === data[selectedQuestion].correctAnswer;

        setQuestionState((prev) => (
            {...prev,
                [selectedQuestion]: {
                    selectedOption: selectedOpt,
                    isAnswered: true
                }
            }
        ))
        if(isCorrect){
            setScore(prevScore => prevScore + 1)
        }
    }
    
    
    return(
        <div className="flex flex-col gap-7 text-center">
                <h3 className="font-medium text-[1.15rem]">{data[selectedQuestion].question}</h3>
                <div className="grid grid-cols-1 gap-3 shadow-lg tablet:grid-cols-2 tablet:gap-4">
                    {data[selectedQuestion].options.map((option, oIndex) => {
                        let isCorrect = option === data[selectedQuestion].correctAnswer;
                        let isSelected = option === selectedOption;
                        const checkIcon = "../resources/Check_round_fill.svg";
                        const closeIcon = "../resources/Close_round_fill.svg";
                        return(                           
                                <button 
                                    className={
                                    `${isSelected ? "bg-primary-bg-clr":"bg-quiz-btn-background"} p-4 rounded-lg  transition-colors ease-in-out duration-1000 hover:bg-primary-bg-clr font-medium text-sm`} 
                                    key={oIndex} disabled={isAnswered}
                                    onClick={()=>{handleOption(option)}}>
                                    {option}
                                    {isAnswered && (isCorrect ? (<img className="inline-block ml-2" src={checkIcon} alt="correct" />) : 
                                    isSelected ? (<img className="inline-block ml-2" src={closeIcon} alt="incorrect" />) : 
                                    null)}
                                </button>                          
                            )                  
                        }
                    )}
                </div>
        </div>
    )
}