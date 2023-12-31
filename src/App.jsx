import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Counter from './components/Counter'
import {FaArrowsRotate} from 'react-icons/fa6'
import {PiPlayPauseFill} from 'react-icons/pi'

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
    if(timer[target1] < 360000) {
      setTimer(prevTimer => {
      return {
        ...prevTimer,
        [target1]: prevTimer[target1] + 6000,
        [target2]: prevTimer[target1] + 6000
      }
    })}
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
        idOfLength={'session-length'}
        addFunc={() => addTime('sessionTime', 'sessionSeconds')}
        idOfIncrement={'session-increment'}
        reduceFunc={() => removeTime('sessionTime', 'sessionSeconds')}
        idOfDecrement={'session-decrement'}
      />
      <Counter
        title='Break Length'
        idOfElement={'break-label'}
        time={timer.breakTime}
        idOfLength={'break-length'}
        addFunc={() => addTime('breakTime', 'breakSeconds')}
        idOfIncrement={'break-increment'}
        reduceFunc={() => removeTime('breakTime', 'breakSeconds')}
        idOfDecrement={'break-decrement'}
      />
      <Timer 
        time={timer.isItBreak ? timer.breakSeconds : timer.sessionSeconds}
        isItBreak={timer.isItBreak}
        idOfLabel={'timer-label'}
        idOfTimeLeft={'time-left'}
      />
      <button id="start_stop" onClick={startPause}><PiPlayPauseFill/></button>
      <button id="reset" onClick={reset}><FaArrowsRotate/></button>
    </>
  )
}

export default App
