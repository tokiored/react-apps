import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
    const [game, setGame] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)

    const cardImages = [
        { matched: false, src: '/img/helmet-1.png' },
        { matched: false, src: '/img/potion-1.png' },
        { matched: false, src: '/img/ring-1.png' },
        { matched: false, src: '/img/scroll-1.png' },
        { matched: false, src: '/img/shield-1.png' },
        { matched: false, src: '/img/sword-1.png' },
    ]

    // automatically start a new game on load
    useEffect(() => {
        shuffleCards()
    }, [])

    // handle the comparison on state change
    useEffect(() => {
        if (choiceOne && choiceTwo) compare(choiceOne, choiceTwo)
    }, [choiceOne, choiceTwo])

    // duplicate and shuffle the cards
    const shuffleCards = () => {
        const shuffle = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({
                id: Math.random(),
                ...card,
            }))

        resetGame()
        setGame(shuffle)
    }

    // handle the card choice state
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // handle the card comparison
    const compare = (one, two) => {
        setIsDisabled(true)
        if (one.src === two.src) {
            setGame((prevGame) =>
                prevGame.map((card) => {
                    if (card.src === one.src) {
                        return {
                            ...card,
                            matched: true,
                        }
                    }
                    return card
                })
            )
        }
        setTimeout(() => handleTurn(), 1000)
    }
    // reset turn and increment the previous turn count state
    function handleTurn(params) {
        setTurns((prevTurns) => prevTurns + 1)
        resetChoice()
        setIsDisabled(false)
    }
    // reset choice
    function resetChoice() {
        setChoiceOne(null)
        setChoiceTwo(null)
    }
    // reset the full game
    function resetGame() {
        setTurns(0)
        resetChoice()
    }

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {game.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        disabled={isDisabled}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default App
