import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Counter from './components/Counter'

function App() {
  const [timer, setTimer] = useState({
    time: 0,
    workTime: 6000,
    breakTime: 6000,
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

  function testRemoveTime() {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        time: prevTimer.time - 6000
      }
    })
  }

  return (
    <>
      <h1>Break + Work - Timer</h1>
      <Timer time={timer.time}/>
      <Counter
        title='Work Time'
        time={timer.workTime}
        addFunc={testAddTime}
        reduceFunc={testRemoveTime}
      />
      <Counter
        title='Break Time'
        time={timer.breakTime}
        addFunc={testAddTime}
        reduceFunc={testRemoveTime}
      />
      <hr/>
      <button onClick={testStart}>Test</button>
      <button>Test Reset</button>
    </>
  )
}

export default App
