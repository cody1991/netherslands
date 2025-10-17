import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadGoogleMapsScript } from './utils/loadGoogleMaps'
import Home from './pages/Home'
import CityDetail from './pages/CityDetail'
import PlaceDetail from './pages/PlaceDetail'
import TestPage from './pages/TestPage'

function App() {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (apiKey && apiKey !== 'your_google_maps_api_key_here') {
      loadGoogleMapsScript(apiKey)
        .then(() => console.log('Google Maps loaded'))
        .catch((error) => console.error('Failed to load Google Maps:', error))
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:cityId" element={<CityDetail />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

