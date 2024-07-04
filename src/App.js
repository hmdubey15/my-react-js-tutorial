import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  useEffect(() => {
    console.log({ a }, " ", { b });
  }, [a]);

  const handleClick = () => {
    setA(a + 10);
    setB(b + 10);
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}

export default App;
