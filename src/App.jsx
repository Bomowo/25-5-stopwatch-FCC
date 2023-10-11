import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Counter from './components/Counter'

function App() {
  const [timer, setTimer] = useState({
    //Two different "seconds" golder for different timers

    workSeconds: 150000,
    workTime: 150000,
    breakSeconds: 30000,
    breakTime: 30000,
    isItBreak: false,
    timerActive: false
  })

  useEffect(() => {
    let intervalId

    if(timer.timerActive && timer.workSeconds === 0 && !timer.isItBreak) {
      setTimer(prevTimer =>{ return {
        ...prevTimer,
        workSeconds: prevTimer.workTime,
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
          workSeconds: prevTimer.workSeconds - 1
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
      workSeconds: 150000,
      workTime: 150000,
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
      <h1>Break + Work - Timer</h1>
      <Counter
        title='Work Time'
        time={timer.workTime}
        addFunc={() => addTime('workTime', 'workSeconds')}
        reduceFunc={() => removeTime('workTime', 'workSeconds')}
      />
      <Counter
        title='Break Time'
        time={timer.breakTime}
        addFunc={() => addTime('breakTime', 'breakSeconds')}
        reduceFunc={() => removeTime('breakTime', 'breakSeconds')}
      />
      <Timer 
        time={timer.isItBreak ? timer.breakSeconds : timer.workSeconds}
        isItBreak={timer.isItBreak}
      />
      <hr/>
      <button onClick={startPause}>Start/Pause</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default App
