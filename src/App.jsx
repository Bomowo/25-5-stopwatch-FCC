import { useState, useEffect } from 'react'
import Timer from './components/Timer'

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
      <Timer time={timer.time}/>
      <button onClick={testStart}>Test</button>
      <button onClick={testAddTime}>Add a minute</button>
    </>
  )
}

export default App
