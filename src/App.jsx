import { useState } from 'react'
import './App.css'
import DistanceCalculator from './MapQuest';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='card'>
      {/* Distance calculator component */}
      <DistanceCalculator />
    </div>
  )
}

export default App
