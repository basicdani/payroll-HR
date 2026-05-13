import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import ObracuniPregled from './pages/obracuni/ObracuniPregled'
import ObracunNovi from './pages/obracuni/ObracunNovi'
import ObracunPromjena from './pages/obracuni/ObracunPromjena'
import Home from './pages/Home'

function App() {
  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.OBRACUNI} element={<ObracuniPregled />} />
        <Route path={RouteNames.OBRACUNI_NOVI} element={<ObracunNovi />} />
        <Route path={RouteNames.OBRACUNI_PROMJENA} element={<ObracunPromjena />} />
      </Routes>
      <hr />
      PayRoll HR | Danijel Zubak
    </Container>
  )
}

export default App
