import { useState } from "react"
import Homepage from "./components/Homepage"
import Questions from "./components/Questions"

export default function App() {

    const [isGameStarted, setIsGameStarted] = useState(false)


    return (
		<div className="page">
            <header>
                <a href="https://www.ifaw.org" target="_blank" rel="noopener noreferrer"><img className="logo" src="./src/assets/ifaw_logo_RGB.jpg" alt="IFAW logo"/></a>
                <a href="https://www.ifaw.org/?form=join" className="brand-btn" target="_blank" rel="noopener noreferrer">Donate</a>
            </header>
            <main>
                <img src="./src/assets/landscape.jpg" className="background-img" alt="Landscape shot of Amboseli National Park." />
                {!isGameStarted? 
                    <Homepage 
                        setIsGameStarted = {setIsGameStarted}
                    /> : 
                    <section className="quiz-section">
                        <Questions
                            setIsGameStarted = {setIsGameStarted}
                        />
                    </section>
                }
            </main>
        </div>
	)
}