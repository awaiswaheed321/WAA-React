import {useReducer} from "react";

const ReducerComponent = () => {
    const initialState = {count: 0, error: null}

    const reducer = (state, action) => {
        switch (action.type) {
            case "increment": {
                const newValue = state.count + 1;
                const hasError = newValue > 5;
                return {
                    ...state, count: hasError ? state.count : newValue, error: hasError ? "Maximum Reached" : null
                }
            }
            case "decrement": {
                const newValue = state.count - 1;
                const hasError = newValue < 0;
                return {
                    ...state, count: hasError ? state.count : newValue, error: hasError ? "Minimum Reached" : null
                }
            }
            case "reset": {
                return {count: 0, error: null}
            }
            default: {
                return state;
            }
        }
        if (action.type === "increment") {
            return {count: state.count + 1};
        } else if (action.type === "decrement") {
            return {count: state.count - 1};
        } else if (action.type === "reset") {
            return {count: 0};
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    return (<div>
        <h2>Count: {state.count}</h2>
        {state.error && <p>{state.error}</p>}
        <button onClick={() => dispatch({type: "decrement"})}>Decrement</button>
        <button onClick={() => dispatch({type: "reset"})}>Reset</button>
        <button onClick={() => dispatch({type: "increment"})}>Increment</button>

    </div>);
};

export default ReducerComponent;
