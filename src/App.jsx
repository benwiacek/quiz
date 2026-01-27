import { useState, useEffect } from "react"
import Homepage from "./components/Homepage"
import Questions from "./components/Questions"

export default function App() {

    const [isGameStarted, setIsGameStarted] = useState(false)
    const [allQuesAnsw, setAllQuesAnsw] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
            .then (res => res.json())
            .then (data => {
                const finalArray = (data.results).map((ques) => {
                    const question = ques.question
                    const randomIndex = Math.floor(Math.random() *(ques.incorrect_answers.length +1))
                    const correctAnsw = ques.correct_answer
                    const allAnswers = [...ques.incorrect_answers.slice(0, randomIndex),
                        correctAnsw, ...ques.incorrect_answers.slice(randomIndex)]
                    return ({question: question, answers: allAnswers, correctAnsw: correctAnsw})
                })
                setAllQuesAnsw(finalArray)
            })
    },[])

    return (
		<main>
            <header>
                <a href="https://www.ifaw.org" target="_blank" rel="noopener noreferrer"><img className="logo" src="./src/assets/ifaw_logo_RGB.jpg" alt="IFAW logo"/></a>
                <a href="https://www.ifaw.org/?form=join" className="brand-btn" target="_blank" rel="noopener noreferrer">Donate</a>
            </header>
            <img src="./src/assets/landscape.jpg" className="background-img" alt="Landscape shot of Amboseli National Park." />
            {!isGameStarted? 
                <Homepage 
                    setIsGameStarted = {setIsGameStarted}
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