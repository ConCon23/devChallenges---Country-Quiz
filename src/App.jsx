import { Quiz } from "./components/Quiz"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, createContext } from "react";
import { Congratulations } from "./components/Congratulations";

export const QuizContext = createContext();

export default function App() {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questionState, setQuestionState] = useState({});
  const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
  })

  return (
    <div className="bg-main-bg min-h-screen flex justify-center items-center">
      <QuizContext.Provider value={{
        selectedQuestion, setSelectedQuestion, 
        score, setScore, 
        isAnswered, setIsAnswered,
        selectedOption, setSelectedOption,
        questionState, setQuestionState,
        questions, setQuestions
        }}>
        <QueryClientProvider client={client}>
          {Object.keys(questionState).length === 10 ? <Congratulations /> : <Quiz />}
        </QueryClientProvider>
      </QuizContext.Provider>
    </div>
  )
}

