import React from 'react';
import '../App.css';

export default function ThirdComponent() {
  return (
    <div className="ThirdComponent">
      Hello World as a part of Third Component.
      <FourthComponent/>
    </div>
  );
}

function FourthComponent() {
  return (
    <div className="FourthComponent">
      Fourth Component
    </div>
  );
}

//export default ThirdComponent;