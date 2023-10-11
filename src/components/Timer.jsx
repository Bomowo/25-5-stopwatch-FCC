export default function Timer ({time}) {
    return (<h2>Test: {Math.floor((time % 360000) / 6000).toString().padStart(2, "0")} : {Math.floor((time % 6000) / 100).toString().padStart(2, "0")}</h2>)
}