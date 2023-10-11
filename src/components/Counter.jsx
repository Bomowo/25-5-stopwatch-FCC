export default function Counter ({time, title, addFunc, reduceFunc, idOfElement, idOfIncrement, idOfDecrement, idOfLength}) {
    return (
        <div className="counter" id={idOfElement}>
            <h2>{title}</h2>
            <button onClick={addFunc} id={idOfIncrement}>+</button>
            <p id={idOfLength}>{Math.floor(time/6000)}</p>
            <button onClick={reduceFunc} id={idOfDecrement}>-</button>
        </div>
    )
}