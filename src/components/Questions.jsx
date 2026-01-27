import he from "he"
import { useState, useEffect, Fragment } from "react"
import clsx from "clsx"

export default function Questions(props) {

    const[selectedAnswers, setSelectedAnswers] = useState([null, null, null, null, null])
    console.log(selectedAnswers)

    const quesAnswElements = props.allQuesAnsw && (props.allQuesAnsw).map((ques, quesIndex) => {
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
                {quesAnswElements}
            </section>
            <button className ="brand-btn" onClick={() => props.setIsGameStarted(false)}>Reset Quiz</button>
        </>
    )
}