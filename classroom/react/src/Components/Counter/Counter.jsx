import React, { useState } from 'react'

const Counter = () => {


    const [count, setCount] = useState(0)



    const plus = () => {
        setCount(count + 1)

    }

    const minus = () => {
        if(setCount > 0){
            setCount(count -1)
        }
        
    }

    const reset = () => {
        setCount(0)
    }

    const hing = () => {
        setCount(count + 5)
    }

    const hingg = () => {
        setCount(count -5)
    }

    
    
  return (
    <div>
        <h1>Counter</h1>

        <h2>{count}</h2>

        <button onClick={hing}>+5</button>

        <button onClick={plus}>+</button>

        <button onClick={minus}>-</button>

        <button onClick={hingg}>-5</button>

        <button onClick={reset}>reset</button>
    </div>
  )
}

export default Counter