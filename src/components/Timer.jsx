export default function Timer ({time, isItBreak, idOfLabel, idOfTimeLeft}) {
    return (<>
        <h2 id={idOfLabel}>{isItBreak? 'Break': 'Session'}</h2> 
        <h2 id={idOfTimeLeft}>{time === 360000 ? '60' : Math.floor((time % 360000) / 6000).toString().padStart(2, "0")}:{Math.floor((time % 6000) / 100).toString().padStart(2, "0")}</h2>
    </>)
}