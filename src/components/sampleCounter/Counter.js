import React, { useState } from 'react';
import './counter.css';

export default function Counter() {
  let [count, setCount] = useState(0);

  increment = () => {
    setCount(count + 1);
  }

  /*  -- or --
  function increment(){
    setCount(count + 1);
  }
  */

  return (
    <div className="Counter">
        <button onClick={increment}>+1</button>
        <span className="count">{count}</span>
    </div>
  );
}

function increment(){

}


