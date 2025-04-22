import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useArima from './hook/useArima'
import { ArimaRequest } from './types/arima';
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  const [payload, setPayload] = useState<ArimaRequest>({
    data: [112, 118, 132, 129, 121, 135, 148, 148, 136, 119, 104, 118, 115, 126, 141, 135, 125, 149, 170, 170],
    params: {
      exog: null,
      order: [2, 2, 2],
      trend: null,
      enforce_stationarity: true,
      enforce_invertibility: true,
      concentrate_scale: false,
      trend_offset: 1,
      dates: null,
      freq: null,
      validate_specification: true
    },
    number_test: 4,
    number_predict: 1
  });

  const { arima, loading, error } = useArima(payload);
  console.log('Predicción:', arima);

  const handleSend = () => {
    try {
      console.log('Predicción:', arima);
    } catch (error) {
      console.error('Error al predecir:', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <button onClick={handleSend}>Enviar a ARIMA</button>
      </div>
    </>
  )
}

export default App
