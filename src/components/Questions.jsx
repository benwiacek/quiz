import he from "he"
import { useState, useEffect, Fragment } from "react"
import clsx from "clsx"

export default function Questions(props) {

    const [isGameOver, setIsGameOver] = useState(false)

    const [allQuesAnsw, setAllQuesAnsw] = useState([]) // stores API data with Q&A
    const [allCorrectAnsw, setAllCorrectAnsw] = useState([]) // stores correct answers only

    const [isFetchFailed, setIsFetchFailed] = useState(false) // to handle error during the fetch request
    const [isLoading, setIsLoading] = useState(false) // handling loading state

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            try {
                const res = await fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
                const data = await res.json()
                const allCorrectAnswersArray = []
                const finalArray = (data.results).map((ques) => {
                    const question = ques.question
                    const randomIndex = Math.floor(Math.random() *(ques.incorrect_answers.length +1))
                    const correctAnsw = ques.correct_answer
                    allCorrectAnswersArray.push(he.decode(correctAnsw))
                    const allAnswers = [...ques.incorrect_answers.slice(0, randomIndex),
                        correctAnsw, ...ques.incorrect_answers.slice(randomIndex)]

                    return ({question: question, answers: allAnswers, correctAnsw: correctAnsw})
                })
                setAllQuesAnsw(finalArray)
                setAllCorrectAnsw(allCorrectAnswersArray)
            } catch (err) {
                setIsFetchFailed(true)
                console.log(err)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    },[])

    const [selectedAnswers, setSelectedAnswers] = useState([null, null, null, null, null]) // stores array of selected answers
    const correctAnswerCount = selectedAnswers.filter(answ => allCorrectAnsw.includes(answ)).length

    const quesAnswElements = allQuesAnsw && (allQuesAnsw).map((ques, quesIndex) => {
        const answElements = (ques.answers).map((answer) => {
            const decodedAnsw = he.decode(answer)
            const answKey = `${quesIndex}-${decodedAnsw}`
            const isChecked = selectedAnswers[quesIndex] === decodedAnsw
            const isCorrect = allCorrectAnsw[quesIndex] === decodedAnsw
            const isIncorrect = allCorrectAnsw[quesIndex] !== decodedAnsw
            const answClassName = clsx("brand-btn",
                isGameOver? 
                    {
                        correctSelect: isCorrect && isChecked,
                        incorrectSelect : isIncorrect && isChecked,
                        "correct greyOut": isCorrect && !isChecked,
                        "answer-btn greyOut": isIncorrect && !isChecked
                    } :
                    {
                        "answer-btn": true, 
                        "checked": isChecked
                    }
            )

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
                        disabled={isGameOver} // will disable/allow radio buttons when game is over/on
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

    function showAnswers() {
        setIsGameOver(true)
    }

    const questionsPage = 
        isFetchFailed?
            <div>There has been a problem with the API. Please try reloading the page</div>
        :
        isLoading?
            <div>Data is loading, please be patient.</div>
        :
            quesAnswElements

    return (
        <>
            <section className="questions">
                {questionsPage}
                {!isGameOver && <button className ="brand-btn" onClick={showAnswers}>Check Answers</button>}
                {isGameOver && 
                    <div className="results-section">
                        <p >You scored <span className="score">{correctAnswerCount}</span>/{allCorrectAnsw.length}!</p>
                        <button className="brand-btn play-again-btn" onClick={() => {props.setIsGameStarted(false)}}>Play Again</button>
                    </div>
                }
            </section>
            {!isGameOver && <button className ="brand-btn reset-btn" onClick={() => props.setIsGameStarted(false)}>Reset Quiz</button>}    

        </>
    )
}