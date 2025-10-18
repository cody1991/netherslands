import { MapPin, Clock, Euro, Calendar, Star, Users, Camera, Heart, BookOpen, Award } from 'lucide-react'

export default function AttractionCard({ attraction, index }) {
  if (!attraction) return null

  // 为每个景点生成一个独特的渐变背景
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600',
    'from-orange-400 to-orange-600',
    'from-cyan-400 to-cyan-600'
  ]

  const gradientClass = gradients[index % gradients.length]

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* 卡片头部 - 带渐变背景 */}
      <div className={`relative h-32 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
        {/* 装饰性元素 */}
        <div className="absolute top-3 right-3 opacity-20">
          <Star className="w-6 h-6 text-white" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-20">
          <Camera className="w-5 h-5 text-white" />
        </div>

        {/* 景点名称和emoji */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-4xl mb-1">{attraction.emoji || '🏛️'}</div>
          <h3 className="text-lg font-bold text-center px-3">{attraction.name}</h3>
        </div>

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* 卡片内容 */}
      <div className="p-5 space-y-4">
        {/* 基本信息 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{attraction.country}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{attraction.duration}</span>
          </div>
        </div>

        {/* 推荐理由 */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-yellow-400">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-yellow-600" />
            <span className="font-semibold text-yellow-800 text-sm">为什么推荐</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {attraction.recommendationReason || attraction.description || '这是一个值得一游的精彩景点，拥有独特的魅力和丰富的体验。'}
          </p>
        </div>

        {/* 景点故事 */}
        {attraction.story && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-400">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-purple-800 text-sm">景点故事</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{attraction.story}</p>
          </div>
        )}

        {/* 历史意义 */}
        {attraction.historicalSignificance && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-l-4 border-blue-400">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-800 text-sm">历史意义</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{attraction.historicalSignificance}</p>
          </div>
        )}

        {/* 门票价格信息 */}
        {attraction.ticketPrice && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
            <div className="flex items-center space-x-2 mb-2">
              <Euro className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-800 text-sm">门票价格</span>
            </div>
            <div className="space-y-1">
              {Object.entries(attraction.ticketPrice).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{key}</span>
                  <span className="font-semibold text-green-600">{value}</span>
                </div>
              ))}
              {Object.keys(attraction.ticketPrice).length > 3 && (
                <div className="text-xs text-gray-500 text-center pt-1">
                  还有 {Object.keys(attraction.ticketPrice).length - 3} 个价格选项
                </div>
              )}
            </div>
          </div>
        )}

        {/* 开放时间信息 */}
        {attraction.openingHours && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border-l-4 border-indigo-400">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-indigo-800 text-sm">开放时间</span>
            </div>
            <div className="space-y-1">
              {Object.entries(attraction.openingHours).slice(0, 2).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{key}</span>
                  <span className="font-semibold text-indigo-600">{value}</span>
                </div>
              ))}
              {Object.keys(attraction.openingHours).length > 2 && (
                <div className="text-xs text-gray-500 text-center pt-1">
                  还有 {Object.keys(attraction.openingHours).length - 2} 个时间安排
                </div>
              )}
            </div>
          </div>
        )}

        {/* 相关名人 */}
        {attraction.famousPeople && attraction.famousPeople.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-l-4 border-orange-400">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="font-semibold text-orange-800 text-sm">相关名人</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {attraction.famousPeople.slice(0, 4).map((person, index) => (
                <span key={index} className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-medium">
                  {person}
                </span>
              ))}
              {attraction.famousPeople.length > 4 && (
                <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-medium">
                  +{attraction.famousPeople.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 最佳游览时间 */}
        {attraction.bestTimeToVisit && (
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border-l-4 border-teal-400">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="font-semibold text-teal-800 text-sm">最佳游览时间</span>
            </div>
            <p className="text-sm text-gray-700">{attraction.bestTimeToVisit}</p>
          </div>
        )}

        {/* 无障碍设施 */}
        {attraction.accessibility && (
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border-l-4 border-pink-400">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-pink-600" />
              <span className="font-semibold text-pink-800 text-sm">无障碍设施</span>
            </div>
            <p className="text-sm text-gray-700">{attraction.accessibility}</p>
          </div>
        )}

        {/* 底部装饰线 */}
        <div className={`h-1 bg-gradient-to-r ${gradientClass} rounded-full`}></div>
      </div>
    </div>
  )
}
