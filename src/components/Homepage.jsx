export default function Homepage(props) {
    return (
        <section className="home">
            <h1>
                Test your knowledge on wildlife.
            </h1>
            <button className="brand-btn" onClick={() => props.startQuiz()}>
                Start Quiz
            </button>
        </section>
    )
}