import './App.css'
import Grids from './Components/Grids/Grids'
function App() {
  return (
    <div className='appMain'>
      <h1 id='heading'>Tic-Tac-Toe</h1>
      <Grids numberOfCards={9}/>
    </div>
  )
}

export default App
