import { styles } from './card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {
    const handleclick = () => {
        if (!disabled) handleChoice(card)
    }
    return (
        <div className="card">
            <div className={flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="card front" />
                <img
                    className="back"
                    src="img/cover.png"
                    alt="card back"
                    onClick={handleclick}
                />
            </div>
        </div>
    )
}
