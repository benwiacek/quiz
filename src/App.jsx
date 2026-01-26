import { useState, useEffect } from "react"
import Homepage from "./components/Homepage"
import Questions from "./components/Questions"

export default function App() {

    const [isGameStarted, setIsGameStarted] = useState(false)
    const [allQuesAnsw, setAllQuesAnsw] = useState([])

    function startQuiz() {
        setIsGameStarted(true)
        getQuesAnsw()
    }

    async function getQuesAnsw() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
        const quesAnsw = await res.json()
        setAllQuesAnsw(quesAnsw.results)
    }

    return (
		<main>
            {!isGameStarted? 
            <section>
                <h1>IFAW Quiz</h1>
                <p>
                    Test your knowledge on wildlife and share to raise awareness on
                    wildlife conservation.
                </p>
                <button onClick={startQuiz}>
                    Start Quiz
                </button>
            </section> : 
            <section>
                {allQuesAnsw.length > 0 && <Questions
                    allQuesAnsw = {allQuesAnsw}
                />}
                
                <button onClick={() => setIsGameStarted(false)}>Reset Quiz</button>
            </section>
            }
        </main>
	)
}