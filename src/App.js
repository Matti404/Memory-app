import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './card';


const cardPictures = [
  {"src":  "/img/bow.jpeg", matched: false },
  {"src":  "/img/elixir.webp", matched: false },
  {"src":  "/img/dragon.png", matched: false },
  {"src":  "/img/fireball.jpeg", matched: false },
  {"src":  "/img/poison.jpeg", matched: false },
  {"src":  "/img/scroll.png", matched: false },
  {"src":  "/img/shield.png", matched: false },
  {"src":  "/img/sword.webp", matched: false },
]

function App() {

  const [gameCards, setGameCards] = useState([])
  const [gameTurns, setGameTurns] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const presentCards = () => {
    const recentCards = [...cardPictures, ...cardPictures]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return ({...card, id: Math.random() })})

    setFirstChoice(null)
    setSecondChoice(null)
    setGameCards(recentCards);
    setGameTurns(0)
  }
  
  // handle a choice
  
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

  // comparing two cards if they match with each other
  
  useEffect(() => {
    
    if (firstChoice && secondChoice) {
      setDisabled(true)
      if (firstChoice.src === secondChoice.src) {
        setGameCards((previousCards) => {
          return previousCards.map((cards) => {
            if (cards.src === firstChoice.src) {
             return {...cards, matched: true}
            } else {
              return cards
            }
          })
        })
        reset()
      } else {
        setTimeout(() =>  {
          reset()
        }, 1000)
        
      }
    }
  }, [firstChoice, secondChoice])

  console.log(gameCards)

// function to reset players choices + turn is increased
const reset = () => {
  setFirstChoice(null)
  setSecondChoice(null)
  setGameTurns((prevTurns) => {
   return prevTurns + 1
  })
  setDisabled(false)
}

// New game
useEffect(() => {
  presentCards()
}, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={presentCards}>Play Again</button>

      <div className="card-grid">
        {gameCards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === firstChoice || card === secondChoice || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {gameTurns}</p>
    </div>
  );
}

export default App;