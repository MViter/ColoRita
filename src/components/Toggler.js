import React, { useState, useEffect } from 'react'

const Toggler = ({ amount: parentAmount }) => {
    const [amount, setAmount] = useState(parentAmount)

    useEffect(() => {
        setAmount(amount)
    }, [parentAmount])

    // console.log('Re-render Toggler');

    const handleDecrement = () => {
        if (amount > 0 ) {
            setAmount(amount - 1)
        }
    }
    const handleIncrement = () => setAmount(amount + 1)
    const handleInput = ({ target }) => {
        setAmount(+target.value)
    }

    return (<div className="counterCounter">
      <button type="button" className="counter-counter-button" onClick={handleDecrement}>-</button>
      <input type="text" className="counter-counter-value" value={amount} onChange={handleInput}/>
      <button type="button" className="counter-counter-button" onClick={handleIncrement}>+</button>
    </div>)
}

export default Toggler // see with console.log() uncommented

// export default React.memo(Toggler);