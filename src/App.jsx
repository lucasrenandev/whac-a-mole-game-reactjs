import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  let [molePosition] = useState(null)
  let [hitPosition] = useState(null)
  let [timeCountdown] = useState(null)
  let [currentTime] = useState(30)
  let [result] = useState(0)

  {/* Criando Tempo + Pontuação do jogo de forma dinâmica */}
  const createTime = () => {
    const time = document.getElementById("time")
    const score = document.getElementById("score")
    time.textContent = currentTime
    score.textContent = result
  }
  useEffect(() => {
    createTime()
  }, [])

  {/* Criando DIVs de forma dinâmica */}
  const createBox = () => {
    const boxContainer = document.querySelector(".main")
    for(let i = 0; i < 9; i++) {
      const box = document.createElement("div")
      box.setAttribute("class", "box")
      box.setAttribute("id", i + 1)
      boxContainer.appendChild(box)
    }
  }
  useEffect(() => {
    createBox()
  }, [])

  {/* Posição aleatória da TOUPEIRA */}
  const randomBox = () => {
    const boxs = document.querySelectorAll(".box")
    boxs.forEach((box) => {
      box.classList.remove("mole")
    })
    const randomItem = boxs[Math.floor(Math.random() * boxs.length)]
    randomItem.classList.add("mole")
    hitPosition = randomItem.id
  }

  {/* Pontuação de acerto */}
  const hitScore = () => {
    const boxs = document.querySelectorAll(".box")
    const score = document.getElementById("score")
    boxs.forEach((box) => {
      box.addEventListener("mouseover", function() {
        if(box.id === hitPosition) {
          result++
          score.textContent = result
          hitPosition = null
        }
      })
    })
  }
  useEffect(() => {
    hitScore()
  }, [])
  
  {/* Mover TOUPEIRA */}
  const moveMole = () => {
    molePosition = setInterval(randomBox, 500)
  }

  {/* Contador regressivo */}
  const countdown = () => {
    const time = document.getElementById("time")
    currentTime--
    time.textContent = currentTime
    if(currentTime === 0) {
      finishGame()
    }
  }

  {/* Finalizar jogo */}
  const finishGame = () => {
    const startGame = document.getElementById("start-game")
    const refreshGame = document.getElementById("refresh-game")
    clearInterval(timeCountdown)
    clearInterval(molePosition)
    hitPosition = null
    startGame.style.display = "none"
    refreshGame.style.display = "inline-block"
    alert("Game Over!!!")
  }

  {/* Controlar sistema */}
  const controlSystem = () => {
    clearInterval(timeCountdown)
    clearInterval(molePosition)
  }

  {/* Iniciar jogo */}
  const startGame = () => {
    controlSystem()
    moveMole()
    timeCountdown = setInterval(countdown, 1000)
  }

  {/* Reiniciar jogo */}
  const refreshGame = () => {
    location.reload()
  }

  return (
    <>
      <section className='container'>
        <div className="time">
          <h2>Time: <span id='time'></span></h2>
          <h2>Score: <span id='score'></span></h2>
        </div>{/* End time */}
        <main className="main">
          {/* Elementos criados dinamicamente com JavaScript */}
          {/* Elements created dynamically with JavaScript */}
        </main>{/* End main */}
        <div className="buttons">
          <button onClick={startGame} 
          id='start-game' type='button'>Start</button>
          <button onClick={refreshGame} 
          id='refresh-game' type='button'>Refresh</button>
        </div>{/* End buttons */}
      </section>{/* End container */}
    </>
  )
}