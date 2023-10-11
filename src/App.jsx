import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Counter from './components/Counter'

function App() {
  const [timer, setTimer] = useState({
    //Two different "seconds" golder for different timers

    sessionSeconds: 150000,
    sessionTime: 150000,
    breakSeconds: 30000,
    breakTime: 30000,
    isItBreak: false,
    timerActive: false
  })

  useEffect(() => {
    let intervalId

    if(timer.timerActive && timer.sessionSeconds === 0 && !timer.isItBreak) {
      setTimer(prevTimer =>{ return {
        ...prevTimer,
        sessionSeconds: prevTimer.sessionTime,
        isItBreak: true
      }})
    }

    if(timer.timerActive && timer.breakSeconds === 0 && timer.isItBreak) {
      setTimer(prevTimer =>{ return {
        ...prevTimer,
        breakSeconds: prevTimer.breakTime,
        isItBreak: false
      }})
    }

    if(timer.timerActive && !timer.isItBreak){
        intervalId = setInterval(() => setTimer(prevTimer => {return {
          ...prevTimer,
          sessionSeconds: prevTimer.sessionSeconds - 1
        }}), 10)
    }

    if(timer.timerActive && timer.isItBreak){
      intervalId = setInterval(() => setTimer(prevTimer => {return {
        ...prevTimer,
        breakSeconds: prevTimer.breakSeconds - 1
      }}), 10)
  }

    return () => clearInterval(intervalId)

  }, [timer])

  function reset() {
    setTimer({
      sessionSeconds: 150000,
      sessionTime: 150000,
      breakSeconds: 30000,
      breakTime: 30000,
      isItBreak: false,
      timerActive: false
    })
  }

  function startPause() {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        timerActive: !prevTimer.timerActive
      }
    })
  }

  function addTime(target1, target2) {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        [target1]: prevTimer[target1] + 6000,
        [target2]: prevTimer[target1] + 6000
      }
    })
  }

  function removeTime(target1, target2) {
    if(timer[target1] > 6000) {
      setTimer(prevTimer => {
        return {
          ...prevTimer,
          [target1]: prevTimer[target1] - 6000,
          [target2]: prevTimer[target1] - 6000
        }
      })
    }
  }

  return (
    <>
      <h1>Break + Session - Timer</h1>
      <Counter
        title='Session Length'
        idOfElement={'session-label'}
        time={timer.sessionTime}
        addFunc={() => addTime('sessionTime', 'sessionSeconds')}
        idOfIncrement={'session-increment'}
        reduceFunc={() => removeTime('sessionTime', 'sessionSeconds')}
        idOfDecrement={'session-decrement'}
      />
      <Counter
        title='Break Length'
        idOfElement={'break-label'}
        time={timer.breakTime}
        addFunc={() => addTime('breakTime', 'breakSeconds')}
        idOfIncrement={'break-increment'}
        reduceFunc={() => removeTime('breakTime', 'breakSeconds')}
        idOfDecrement={'break-decrement'}
      />
      <Timer 
        time={timer.isItBreak ? timer.breakSeconds : timer.sessionSeconds}
        isItBreak={timer.isItBreak}
      />
      <hr/>
      <button onClick={startPause}>Start/Pause</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default App
