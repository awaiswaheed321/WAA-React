import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, reset} from "./state/counter.js";

function App() {
    const {count} = useSelector(state => state.counter);
    const dispatch = useDispatch();
    return (<div>
        <h1>The count is: {count}</h1>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</button>
    </div>)
}

export default App
