import he from "he"

export default function Questions(props) {

    const quesAnswElements = (props.allQuesAnsw).map((ques, quesIndex) => {
        const randomIndex = Math.floor(Math.random() *(ques.incorrect_answers.length +1))
        const allAnswers = [...ques.incorrect_answers.slice(0, randomIndex),
        ques.correct_answer, ...ques.incorrect_answers.slice(randomIndex)]

        const answElements = allAnswers.map((answer, answIndex) => <button key={answIndex}>{answer}</button>)
    
        return (
            <section key={quesIndex}>
                <p>{he.decode(ques.question)}</p>
                {answElements}
            </section>
        )
    })

    return (
        <section>
            {quesAnswElements}
        </section>
    )

}