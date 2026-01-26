export default function Homepage(props) {
    return (
        <section>
            <h1>IFAW Quiz</h1>
            <p>
                Test your knowledge on wildlife and share to raise awareness on
                wildlife conservation.
            </p>
            <button onClick={() => props.setIsGameStarted(true)}>
                Start Quiz
            </button>
        </section>
    )
}