import {useMemo, useState} from "react";

const UseMemoComponent = () => {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);

    // Slow functions usage
    const doubleNumber = useMemo(() => {
        return slowFunction(number);
    }, [number]);

    // Referential Equality usage
    const themeStyle = useMemo(() => {
        return {
            backgroundColor: dark ? "black" : "white", color: dark ? "white" : "black",
        };
    }, [dark]);

    return (<div>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Change Theme
            </button>
            <div style={themeStyle}>{doubleNumber}</div>
        </div>);
};

const slowFunction = (number) => {
    for (let i = 0; i < 1000000000; i++) {
    }
    return number * 2;
};

export default UseMemoComponent;
