// import React, {useState} from 'react'

// const Counter = (user,currency) => {

// const [count, setCount] = useState(0)
// const plus = () => {
//     setCount(count + 1)
// }

// const minus = () => {
//     setCount(count - 1)
// }

//   return (
//     <div>
//         <h1>{user}: {count} {currency}</h1>
//         <div>
//             <button onClick={plus}>+</button>
//             <button onClick={minus}>-</button>
//         </div>
//     </div>
//   )
// }

// export default Counter


import React, { useState } from 'react'

const Counter = ({ user, currency }) => {

  const [count, setCount] = useState(0)
  const [input, setInput] = useState()

  const plus = () => {
    setCount(count + input)
  }

  const minus = () => {
    setCount(count - input )
  }

  return (
    <div>
      <h1>{user}: {count} {currency}</h1>
      <input type="number" value={input} onChange={event => setInput(+event.target.value)} />

      <div>
        <button onClick={plus}>+</button>
        <button onClick={minus}>-</button>
      </div>
    </div>
  )
}

export default Counter