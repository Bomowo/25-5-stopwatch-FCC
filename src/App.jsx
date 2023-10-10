import { useState, useEffect } from 'react'

function App() {
  const [timer, setTimer] = useState({
    time: 300,
    timerActive: false
  })

  useEffect(() => {
    let intervalId

    if(timer.timerActive && timer.time === 0) {
      setTimer({
        time: 0,
        timerActive: false
      })
    }

    if(timer.timerActive){
        intervalId = setInterval(() => setTimer(prevTimer => {return {
          ...prevTimer,
          time: prevTimer.time - 1
        }}), 10)
    }

    return () => clearInterval(intervalId)

  }, [timer])

  function testStart() {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        timerActive: true
      }
    })
  }

  function testAddTime() {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        time: prevTimer.time + 6000
      }
    })
  }

  return (
    <>
      <h1>Hello, World !</h1>
      <h2>Test: {Math.floor((timer.time % 360000) / 6000).toString().padStart(2, "0")} : {Math.floor((timer.time % 6000) / 100).toString().padStart(2, "0")}</h2>
      <button onClick={testStart}>Test</button>
      <button onClick={testAddTime}>Add a minute</button>
    </>
  )
}

export default App
