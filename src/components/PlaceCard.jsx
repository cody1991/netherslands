import { Link } from 'react-router-dom'
import { MapPin, Clock, Train, Car, Plane, ArrowRight, Sparkles } from 'lucide-react'
import { getPlaceGradient } from '../utils/getPlaceGradient'
import { getPlaceImageUrl } from '../utils/getPlaceImage'

const transportIcons = {
  train: Train,
  car: Car,
  plane: Plane,
}

export default function PlaceCard({ place }) {
  const gradient = getPlaceGradient(place)
  const imageUrl = getPlaceImageUrl(place)

  return (
    <Link
      to={`/place/${place.id}`}
      className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      {/* Image */}
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradient}`}>
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </>
        )}
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{place.emoji}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary-600 shadow-md">
            {place.duration}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md">
            {place.country}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{place.distance}</span>
          <Clock className="w-4 h-4 ml-4 mr-1" />
          <span>{place.travelTime}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {place.description}
        </p>

        {/* Transportation options */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">交通方式：</p>
          <div className="flex flex-wrap gap-2">
            {place.transport.map((option, index) => {
              const Icon = transportIcons[option.type] || Train
              return (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-xs"
                >
                  <Icon className="w-3 h-3" />
                  <span>{option.method}</span>
                  <span className="text-gray-500">• {option.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">推荐景点：</p>
          <div className="flex flex-wrap gap-1">
            {place.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
              >
                {highlight}
              </span>
            ))}
            {place.highlights.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{place.highlights.length - 3} 更多
              </span>
            )}
          </div>
        </div>

        {/* View details indicator */}
        <div className="w-full flex items-center justify-center space-x-2 text-primary-600 group-hover:text-primary-700 font-medium text-sm py-3 border-t border-gray-100">
          <span>点击查看详情</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

