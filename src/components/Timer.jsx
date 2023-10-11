export default function Timer ({time, isItBreak}) {
    return (<h2>{isItBreak? 'Break': 'Session'}: {Math.floor((time % 360000) / 6000).toString().padStart(2, "0")} : {Math.floor((time % 6000) / 100).toString().padStart(2, "0")}</h2>)
}