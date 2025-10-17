import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { cities } from '../data/cities'
import { allAttractions, getAttractionsByCityAndCategory } from '../data/attractions/index'
import PlaceCard from '../components/PlaceCard'
import CitySelector from '../components/CitySelector'
import { saveLastCity, saveLastCategory, getLastCategory } from '../utils/storage'

const categories = [
  { id: 'local', name: '本地游览', icon: '🏙️' },
  { id: 'day-trip', name: '当天来回', icon: '🚗' },
  { id: 'weekend', name: '2天周末游', icon: '🏖️' },
  { id: 'long-weekend', name: '3-4天游', icon: '✈️' },
  { id: 'international', name: '周边国家', icon: '🌍' },
]

export default function CityDetail() {
  const { cityId } = useParams()
  // 从 localStorage 读取该城市上次选择的分类
  const [activeCategory, setActiveCategory] = useState(() => getLastCategory(cityId))

  const city = cities.find(c => c.id === cityId)

  // 保存当前访问的城市
  useEffect(() => {
    if (city) {
      saveLastCity(cityId)
    }
  }, [cityId, city])

  // 当用户切换分类时，保存到 localStorage
  useEffect(() => {
    saveLastCategory(cityId, activeCategory)
  }, [cityId, activeCategory])

  // 当城市切换时，恢复该城市上次选择的分类
  useEffect(() => {
    setActiveCategory(getLastCategory(cityId))
  }, [cityId])

  if (!city) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">城市未找到</h1>
          <Link
            to="/city/almere"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  // 过滤从该城市出发的景点
  const cityPlaces = allAttractions.filter(p => p.departureCity === cityId)

  // 根据分类过滤
  const filteredPlaces = activeCategory === 'local'
    ? cityPlaces.filter(place => place.category === 'local')
    : activeCategory === 'day-trip'
      ? cityPlaces.filter(place => place.duration.includes('当天来回'))
      : activeCategory === 'weekend'
        ? cityPlaces.filter(place => place.duration.includes('2天') || place.duration.includes('周末'))
        : activeCategory === 'long-weekend'
          ? cityPlaces.filter(place => place.duration.includes('3-4天'))
          : cityPlaces.filter(place => place.category === 'international')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header with city selector */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={`/city/${cityId}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <MapPin className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">欧洲旅行指南</span>
            </Link>
            <CitySelector currentCityId={cityId} />
          </div>

          {/* Category tabs */}
          <div className="border-t border-gray-200">
            <nav className="flex space-x-1 overflow-x-auto custom-scrollbar py-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                    whitespace-nowrap transition-all duration-200
                    ${activeCategory === category.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            从{city.nameZh}出发 🌍
          </h1>
          <p className="text-lg text-gray-600">{city.description}</p>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无此分类的推荐景点</p>
            <p className="text-gray-400 text-sm mt-2">试试其他分类吧</p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {categories.find(c => c.id === activeCategory)?.name}
                <span className="text-gray-500 text-lg ml-2">({filteredPlaces.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2025 欧洲旅行指南 | 从{city.nameZh}出发，探索欧洲之美
          </p>
        </div>
      </footer>
    </div>
  )
}

