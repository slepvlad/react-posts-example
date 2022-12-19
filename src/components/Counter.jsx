import React, {useState} from 'react';

const Counter = () => {
    const [count, setCounts] = useState(0);

    function increment() {
        setCounts(count + 1);
    }

    function decrement() {
        setCounts(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;