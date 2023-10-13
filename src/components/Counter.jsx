import {FaMinus, FaPlus} from 'react-icons/fa'

export default function Counter ({time, title, addFunc, reduceFunc, idOfElement, idOfIncrement, idOfDecrement, idOfLength}) {
    return (
        <div className="counter" id={idOfElement}>
            <h2 className="counter-title">{title}</h2>
            <button className="counter-minus" onClick={reduceFunc} id={idOfDecrement}><FaMinus/></button>
            <p className="counter-number" id={idOfLength}>{Math.floor(time/6000)}</p>
            <button className="counter-plus" onClick={addFunc} id={idOfIncrement}><FaPlus/></button>
        </div>
    )
}