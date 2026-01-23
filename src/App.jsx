import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function App() {
fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => console.log(data.results))


	return (
		<section>
			<h1>IFAW Quiz</h1>
			<p>
				Test your knowledge on wildlife and share to raise awareness on
				wildlife conservation.
			</p>
			<button>
				Start Quiz
			</button>
		</section>
	)

}

[
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Animals",
        "question": "The Kākāpō is a large, flightless, nocturnal parrot native to which country?",
        "correct_answer": "New Zealand",
        "incorrect_answers": [
            "South Africa",
            "Australia",
            "Madagascar"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Animals",
        "question": "Hippocampus is the Latin name for which marine creature?",
        "correct_answer": "Seahorse",
        "incorrect_answers": [
            "Dolphin",
            "Whale",
            "Octopus"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Animals",
        "question": "What is the name of a rabbit&#039;s abode?",
        "correct_answer": "Burrow",
        "incorrect_answers": [
            "Nest",
            "Den",
            "Dray"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Animals",
        "question": "What is the collective noun for a group of crows?",
        "correct_answer": "Murder",
        "incorrect_answers": [
            "Pack",
            "Gaggle",
            "Herd"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Animals",
        "question": "Which class of animals are newts members of?",
        "correct_answer": "Amphibian",
        "incorrect_answers": [
            "Fish",
            "Reptiles",
            "Mammals"
        ]
    }
]