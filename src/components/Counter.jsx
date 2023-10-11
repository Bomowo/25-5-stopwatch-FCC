export default function Counter ({time, title, addFunc, reduceFunc}) {
    return (
        <div className="counter">
            <h2>{title}</h2>
            <button onClick={addFunc}>+</button>
            <p>{Math.floor(time/6000)}</p>
            <button onClick={reduceFunc}>-</button>
        </div>
    )
}