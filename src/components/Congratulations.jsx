import { useContext } from "react";
import { QuizContext } from "../App";
export const Congratulations = () => {
    const { score,
            questions,
            setSelectedQuestion, 
            setScore, 
            setIsAnswered,
            setSelectedOption,
            setQuestionState,
            setQuestions} = useContext(QuizContext);

    const handlePlayAgain = () => {
        setSelectedQuestion(0)
        setScore(0)
        setIsAnswered(false)
        setSelectedOption(null)
        setQuestions([])
        setQuestionState({})
    }

    return (
        <div className="bg-quiz-background m-5 rounded-xl max-w-[385px]">
            <div className="grid gap-8 text-center text-secondary-txt-clr px-9 pt-5 pb-[4em] font-medium">
                <img src="../resources/congrats.png" alt="Congratulations"/>
                <p className="text-2xl">Congrats! You completed the quiz.</p>
                <p className="text-[1em]">You answered {`${score}/${questions.length} Points`} correctly</p>
                <button 
                className="bg-primary-bg-clr py-4 w-full max-w-[220px] rounded-lg justify-self-center"
                onClick={handlePlayAgain}
                >Play again</button>
            </div>
        </div>
    )   
}