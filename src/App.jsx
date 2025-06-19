import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './MainPage'
import AppPage from './AppPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  )
}

export default App
