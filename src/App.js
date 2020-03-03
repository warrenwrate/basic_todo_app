import React from 'react';
import TodoApp from './components/todo/TodoApp'
import './App.css';
import './bootstrap.css'
/*
import ThirdComponent from './components/ThirdComponent';
import Counter from './components/sampleCounter/Counter';
*/


function App() {
  return (
    <div className="App">
      <TodoApp/>
      {
        /*
              <Counter/>
              <SecondComponent/>
              <ThirdComponent/>
        */
      }

    </div>
  );
}

/*
function SecondComponent() {
  return (
    <div className="SecondComponent">
      Second Component
    </div>
  );
}
*/

export default App;
