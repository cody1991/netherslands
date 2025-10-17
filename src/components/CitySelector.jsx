import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MapPin, Check } from 'lucide-react'
import { cities } from '../data/cities'

export default function CitySelector({ currentCityId }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const currentCity = cities.find(c => c.id === currentCityId) || cities[0]
  const hasMultipleCities = cities.length > 1

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCityChange = (cityId) => {
    navigate(`/city/${cityId}`)
    setIsOpen(false)
  }

  // 如果只有一个城市，显示为静态标签
  if (!hasMultipleCities) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
        <span className="text-2xl">{currentCity.emoji}</span>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">出发城市</span>
          <span className="font-semibold text-gray-900">{currentCity.nameZh}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-primary-500 hover:shadow-md transition-all group"
      >
        <span className="text-2xl">{currentCity.emoji}</span>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">出发城市</span>
          <span className="font-semibold text-gray-900">{currentCity.nameZh}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[32rem] flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
            <p className="text-xs font-semibold text-gray-500 uppercase">选择出发城市</p>
            <p className="text-xs text-gray-400 mt-1">{cities.length} 个城市</p>
          </div>
          <div className="overflow-y-auto custom-scrollbar py-1">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCityChange(city.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-primary-50 transition-colors ${city.id === currentCityId ? 'bg-primary-50' : ''
                  }`}
              >
                <span className="text-3xl">{city.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{city.nameZh}</span>
                    {city.id === currentCityId && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{city.country}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

