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
            <header>
                <a href="https://www.ifaw.org" target="_blank" rel="noopener noreferrer"><img className="logo" src="./src/assets/ifaw_logo_RGB.jpg" alt="IFAW logo"/></a>
                <a href="https://www.ifaw.org/?form=join" className="brand-btn" target="_blank" rel="noopener noreferrer">Donate</a>
            </header>
            <img src="./src/assets/landscape.jpg" className="background-img" alt="Landscape shot of Amboseli National Park." />
            {!isGameStarted? 
                <Homepage 
                    startQuiz = {startQuiz}
                /> : 
                <section>
                    {allQuesAnsw.length > 0 && 
                        <Questions
                            allQuesAnsw = {allQuesAnsw}
                            setIsGameStarted={setIsGameStarted}
                    />}
                </section>
            }
        </main>
	)
}