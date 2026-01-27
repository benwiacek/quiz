import he from "he"
import { useState, useEffect, Fragment } from "react"
import clsx from "clsx"

export default function Questions() {

    const [allQuesAnsw, setAllQuesAnsw] = useState([]) // stores API data with Q&A

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

    const[selectedAnswers, setSelectedAnswers] = useState([null, null, null, null, null]) // stores array of selected answers
    console.log(selectedAnswers)

    const quesAnswElements = allQuesAnsw && (allQuesAnsw).map((ques, quesIndex) => {
        const answElements = (ques.answers).map((answer) => {
            const decodedAnsw = he.decode(answer)
            const answKey = `${quesIndex}-${decodedAnsw}`
            const isChecked = selectedAnswers[quesIndex] === decodedAnsw
            const answClassName = clsx("answer-btn", isChecked && "checked")

            function handleChange(event) {
                const {name, value} = event.currentTarget
                const selectedIndex = Number(name)
                setSelectedAnswers(prevAnsw => (
                    prevAnsw[selectedIndex] === value?
                        prevAnsw :
                        prevAnsw.with(selectedIndex, value)
                ))
            }
            
            return (
                <Fragment key={answKey}>
                    <input 
                        type="radio" 
                        id={decodedAnsw}
                        name={quesIndex} 
                        value={decodedAnsw}
                        checked={isChecked}
                        onChange={handleChange}
                        
                    />
                    <label 
                        className={answClassName} htmlFor={decodedAnsw}
                    >
                        {decodedAnsw}
                    </label>
                </Fragment>
            )
        })
    
        return (
            <section key={quesIndex}>
                <h2 className="question">{he.decode(ques.question)}</h2>
                <form className="answers">
                    {answElements}
                </form>
            </section>
        )
    })

    return (
        <>
            <section className="questions">
                {allQuesAnsw.length > 0 && quesAnswElements}
            </section>
            <button className ="brand-btn" onClick={() => props.setIsGameStarted(false)}>Reset Quiz</button>
        </>
    )
}