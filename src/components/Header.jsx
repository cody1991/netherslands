import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const categories = [
  { id: 'all', name: '全部推荐', icon: '🌟' },
  { id: 'day-trip', name: '当天来回', icon: '🚗' },
  { id: 'weekend', name: '2天周末游', icon: '🏖️' },
  { id: 'long-weekend', name: '3-4天游', icon: '✈️' },
  { id: 'netherlands', name: '荷兰境内', icon: '🇳🇱' },
  { id: 'international', name: '周边国家', icon: '🌍' },
]

export default function Header({ activeCategory, setActiveCategory }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <MapPin className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">荷兰周边游</span>
          </Link>
          <div className="hidden md:block">
            <span className="text-sm text-gray-500">📍 Almere, Netherlands</span>
          </div>
        </div>

        {/* Navigation tabs */}
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
  )
}

