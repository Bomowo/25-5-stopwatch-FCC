import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Counter from './components/Counter'

function App() {
  const [timer, setTimer] = useState({
    time: 6000,
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

  function startPause() {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        timerActive: !prevTimer.timerActive
      }
    })
  }

  function addTime(target) {
    setTimer(prevTimer => {
      return {
        ...prevTimer,
        [target]: prevTimer[target] + 6000
      }
    })
  }

  function removeTime(target) {
    if(timer[target] > 0) {
      setTimer(prevTimer => {
        return {
          ...prevTimer,
          [target]: prevTimer[target] - 6000
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
        addFunc={() => addTime('workTime')}
        reduceFunc={() => removeTime('workTime')}
      />
      <Counter
        title='Break Time'
        time={timer.breakTime}
        addFunc={() => addTime('breakTime')}
        reduceFunc={() => removeTime('breakTime')}
      />
      <Timer time={timer.time}/>
      <hr/>
      <button onClick={startPause}>Start/Pause</button>
      <button>Test Reset</button>
    </>
  )
}

export default App
