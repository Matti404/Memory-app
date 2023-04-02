import './card.css'

function SingleCard({card, handleChoice, flipped, disabled }) {

    const turnSide = () => {
        if (!disabled) {
            handleChoice(card)
        } 
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className='front' src={card.src} alt="card front" />
              <img 
              className='back' src="/img/backpicture.png" 
              onClick={turnSide} 
              alt="card back" />
            </div>
        </div>
    )
}

export default SingleCard