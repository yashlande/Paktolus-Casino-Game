import { useState } from "react";
import Spinnerr from "./components/Spinnerr";
import "./styles.css";

export default function App() {

  const [showConfirmation, setConfirmation] = useState(false)
  const [playBalance, setPlayBlance] = useState(9.99);

  const spin = () => {
    setPlayBlance(prevBal => prevBal - 2);
  }

  const normalWin = () => {
    setPlayBlance(prevBal => prevBal + 0.5);
  }

  const bigWin = () => {
    setPlayBlance(prevBal => prevBal + 5);
  }

  const showConfirmations = () => {
    setConfirmation(!showConfirmation)
  }

  return (
    <>
      <footer>
        <h1>Footer Content</h1>
      </footer>
      <div className="App" style={{ color: 'white' }}>
        <h1>Welcome to Paktolus Casino Game</h1>
        <h2>If You Win, You Get Job!</h2>
        <button onClick={() => showConfirmations()}>Start Game</button>
      </div>
      <div>
        {showConfirmation &&
          <Spinnerr bal={playBalance} onClose={showConfirmations} normalSpin={spin} normalWin={normalWin} bigWin={bigWin} />
        }
      </div>
      <footer>
        <div>
          <h1>Paktolus Casino</h1>
        </div>
        <div style={{display:'flex', flexDirection:'column-reverse'}}>
          <h1>Balance = ${playBalance}</h1>
          {playBalance<2?<h4 style={{color:'red'}}>Insufficient Funds. Please refresh the Page</h4>:null}
        </div>
      </footer>
    </>
  );
}
