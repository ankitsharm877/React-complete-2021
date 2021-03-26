import React, { useState } from "react";

const PersonHook = () => {
    const [personState, setPersonState] = useState({
        name: 'Ankit Sharma',
        age: '26'
    });
    const changeAgeHandler = () => {
        setPersonState(
            {...personState,
            age:'29'
        })
    }
    return (
        <div>
            <button onClick={changeAgeHandler}>Change Age</button>
            <p>I'm a {personState.name} and I am {personState.age} years old!</p>
        </div>
    )
}

export default PersonHook;