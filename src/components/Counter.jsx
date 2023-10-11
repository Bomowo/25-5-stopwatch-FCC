export default function Counter ({time, title, addFunc, reduceFunc, id}) {
    return (
        <div className="counter" id={id}>
            <h2>{title}</h2>
            <button onClick={addFunc}>+</button>
            <p>{Math.floor(time/6000)}</p>
            <button onClick={reduceFunc}>-</button>
        </div>
    )
}