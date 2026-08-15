# Wildlife Quiz

A React-based trivia game that tests your knowledge of wildlife, featuring questions from the Open Trivia Database API. Built with a clean interface and integrated with IFAW branding.

<img width="600" height="400" alt="quiz-screenshot" src="https://github.com/user-attachments/assets/865f9a33-f52e-4119-9dad-25947ba90428" />

[**Live Demo**](https://wildlife-quiz.netlify.app/)

## Features

- Fetches 5 random wildlife questions from Open Trivia Database API
- Shuffles answer order to prevent pattern recognition
- Color-coded feedback: green (correct), red (incorrect), grey (not selected)
- Score tracking with play again functionality

## Built with

React, JavaScript, HTML, CSS

## How it works

- useEffect fetches API data and randomizes answer positions
- Radio inputs track user selections in state array
- Conditional rendering reveals results only after "Check Answers"
- State reset triggers new API call for fresh questions

## Acknowledgments

- Wildlife questions powered by [Open Trivia Database](https://opentdb.com/)
- Supports [IFAW (International Fund for Animal Welfare)](https://www.ifaw.org)
