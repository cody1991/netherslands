import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Train, Car, Plane, Home, Sparkles } from 'lucide-react'
import { allAttractions, findAttractionById } from '../data/attractions/index'
import MapComponent from '../components/MapComponent'
import AttractionCard from '../components/AttractionCard'
import { getPlaceGradient } from '../utils/getPlaceGradient'
import { getPlaceImageUrl } from '../utils/getPlaceImage'

const transportIcons = {
  train: Train,
  car: Car,
  plane: Plane,
}

// 获取景点emoji的辅助函数
function getAttractionEmoji(attractionName) {
  const emojiMap = {
    '梵高博物馆': '🎨',
    '国立博物馆': '🏛️',
    '安妮之家': '📚',
    '运河游船': '🚣',
    '约旦区': '🏘️',
    '红灯区': '🌃',
    'NDSM文化区': '🎭',
    '立体方块屋': '🏠',
    '伊拉斯谟大桥': '🌉',
    '鹿特丹市场': '🛒',
    '欧洲桅杆': '🗼',
    '博伊曼斯美术馆': '🎨',
    '小孩堤防风车群': '🌾',
    '主教塔': '⛪',
    '运河码头': '🚣',
    '德哈尔城堡': '🏰',
    '中央博物馆': '🏛️',
    'Nijntje博物馆': '🐰',
    '大广场': '🏛️',
    '原子塔': '⚛️',
    '撒尿小童': '👶',
    '皇家美术馆': '🎨',
    '漫画博物馆': '📚',
    '圣米歇尔大教堂': '⛪',
    '欧盟区': '🏢',
    '布鲁日钟楼': '🕰️',
    '圣母大教堂': '⛪',
    '格罗宁格博物馆': '🎨',
    '运河游船': '🚣',
    '市场广场': '🏛️',
    '科隆大教堂': '⛪',
    '巧克力博物馆': '🍫',
    '路德维希博物馆': '🎨',
    '霍亨索伦桥': '🌉',
    '埃菲尔铁塔': '🗼',
    '卢浮宫': '🏛️',
    '圣母院': '⛪',
    '香榭丽舍大街': '🛍️',
    '凯旋门': '🏛️',
    '塞纳河游船': '🚣',
    '蒙马特高地': '⛰️',
    '圣心大教堂': '⛪',
    '蓬皮杜中心': '🏛️',
    '奥赛博物馆': '🎨',
    '凡尔赛宫': '🏰',
    '大英博物馆': '🏛️',
    '伦敦塔': '🏰',
    '大本钟': '🕰️',
    '伦敦眼': '🎡',
    '白金汉宫': '🏰',
    '泰晤士河游船': '🚣',
    '海德公园': '🌳',
    '威斯敏斯特教堂': '⛪',
    '圣保罗大教堂': '⛪',
    '塔桥': '🌉',
    '马斯特里赫特': '🏛️',
    '圣塞尔瓦蒂乌斯教堂': '⛪',
    '地狱之门': '🚪',
    '博尼范登博物馆': '🎨',
    '基夫特': '🌊',
    '北海沿岸': '🌊',
    '海滩': '🏖️',
    '沙丘': '🏜️',
    '灯塔': '🗼',
    '根特': '🏰',
    '圣巴夫大教堂': '⛪',
    '根特钟楼': '🕰️',
    '圣尼古拉斯教堂': '⛪',
    '杜塞尔多夫': '🏢',
    '国王大道': '🛍️',
    '莱茵塔': '🗼',
    '风车村赞斯': '🌾',
    '木鞋工坊': '👟',
    '奶酪工坊': '🧀',
    '风车': '🌾',
    '莱顿': '🎓',
    '莱顿大学': '🎓',
    '风车博物馆': '🌾',
    '小孩堤防': '🌾',
    '哈勒姆': '🏛️',
    '圣巴夫大教堂': '⛪',
    '弗兰斯·哈尔斯博物馆': '🎨',
    '代尔夫特': '🏺',
    '代尔夫特蓝陶': '🏺',
    '新教堂': '⛪',
    '老教堂': '⛪',
    '鲁汶': '🎓',
    '鲁汶大学': '🎓',
    '圣彼得教堂': '⛪',
    '卢森堡': '🏰',
    '卢森堡大公宫': '🏰',
    '宪法广场': '🏛️',
    '汉堡': '🏢',
    '汉堡港': '🚢',
    '圣米迦勒教堂': '⛪',
    '仓库城': '🏭',
    '庞贝遗址': '🏛️',
    '论坛广场': '🏛️',
    '别墅壁画': '🎨',
    '圆形剧场': '🎭',
    '妓院遗迹': '🏛️'
  }

  return emojiMap[attractionName] || '🏛️'
}

// 获取推荐理由的辅助函数
function getRecommendationReason(attractionName, placeName) {
  const reasonMap = {
    '梵高博物馆': '这里收藏了世界上最多的梵高作品，是艺术爱好者必访的圣地，能够近距离欣赏《向日葵》和《星夜》等传世名作。',
    '国立博物馆': '荷兰最重要的艺术博物馆，伦勃朗的《夜巡》就收藏于此，是了解荷兰黄金时代艺术的绝佳场所。',
    '安妮之家': '二战历史的见证，安妮·弗兰克的故事感动了全世界，是重要的历史教育场所，让人深刻反思战争的残酷。',
    '运河游船': '阿姆斯特丹被称为"北方威尼斯"，乘坐游船穿越运河是体验这座城市魅力的最佳方式，两岸17世纪建筑美不胜收。',
    '立体方块屋': '鹿特丹最著名的现代建筑奇观，每座房屋都倾斜45度，内部可以参观，是建筑爱好者和摄影爱好者的天堂。',
    '伊拉斯谟大桥': '被誉为"天鹅桥"的斜拉桥，优雅的造型成为鹿特丹的象征，夜晚灯光璀璨，是城市天际线的亮点。',
    '主教塔': '荷兰最高的教堂塔楼，登顶可以俯瞰整个乌得勒支，112米的高度提供了绝佳的城市全景视角。',
    '大广场': '被联合国教科文组织列为世界文化遗产，周围环绕着17世纪哥特式建筑，是欧洲最美的广场之一。',
    '原子塔': '为1958年世博会建造的现代建筑杰作，102米高的原子结构建筑成为布鲁塞尔的标志性建筑。',
    '布鲁日钟楼': '中世纪建筑的杰作，366级台阶登顶可以俯瞰整个布鲁日，是这座"北方威尼斯"的最佳观景点。',
    '科隆大教堂': '哥特式建筑的巅峰之作，世界文化遗产，157米高的双塔成为科隆的象征，内部彩绘玻璃窗美轮美奂。',
    '埃菲尔铁塔': '巴黎的象征，世界最著名的建筑之一，登顶可以俯瞰整个巴黎，是浪漫之都的最佳观景点。',
    '卢浮宫': '世界最大的艺术博物馆，收藏了《蒙娜丽莎》等无数艺术珍品，建筑本身就是艺术品，是艺术爱好者的朝圣地。',
    '大英博物馆': '世界最著名的博物馆之一，收藏了来自世界各地的文物，包括罗塞塔石碑等镇馆之宝，是了解人类文明的最佳场所。',
    '庞贝遗址': '公元79年被维苏威火山掩埋的罗马古城，时间凝固的历史奇迹，是了解古罗马生活的最佳窗口。',
    '论坛广场': '古罗马的政治和宗教中心，曾经是罗马帝国的核心，现在仍能看到宏伟的柱廊和建筑遗迹。',
    '圆形剧场': '古罗马最大的圆形剧场之一，可以容纳2万观众，是了解古罗马娱乐文化的重要场所。'
  }

  return reasonMap[attractionName] || `这是${placeName}最值得一游的景点之一，拥有丰富的历史文化内涵和独特的魅力，是了解当地文化的最佳窗口。`
}

// 获取景点故事的辅助函数
function getAttractionStory(attractionName, placeName) {
  const storyMap = {
    '梵高博物馆': '梵高生前只卖出了一幅画，却在死后成为世界上最著名的画家之一。这座博物馆收藏了他200多幅画作，包括著名的《向日葵》系列，每一幅画都诉说着这位天才画家的内心世界。',
    '安妮之家': '1942年，13岁的安妮·弗兰克和家人为了躲避纳粹迫害，在这栋房子的阁楼里躲藏了两年多。她写下了著名的《安妮日记》，记录了一个少女在战争中的成长和思考。',
    '立体方块屋': '建筑师Piet Blom设计这些房屋时，想要创造"城市中的森林"。每座房屋代表一棵树，整个建筑群象征一片森林，体现了荷兰人对自然和创新的独特理解。',
    '伊拉斯谟大桥': '这座桥以荷兰著名学者伊拉斯谟命名，他被称为"欧洲的王子"。桥的设计灵感来自天鹅的优雅姿态，因此也被称为"天鹅桥"。',
    '大广场': '这座广场见证了布鲁塞尔的历史变迁，从13世纪的市场到现在的世界文化遗产。广场上的建筑在1695年被法国军队轰炸后重建，每一栋建筑都有其独特的故事。',
    '原子塔': '这座建筑是为1958年布鲁塞尔世博会而建，代表了人类对原子时代的向往。每个球体代表一个原子，整个结构象征铁分子的晶体结构。',
    '科隆大教堂': '这座教堂的建造历时600多年，从1248年开始到1880年才完工。二战期间，科隆几乎被夷为平地，但大教堂奇迹般地保存了下来，成为希望的象征。',
    '埃菲尔铁塔': '这座铁塔最初是为了1889年巴黎世博会而建，当时遭到了很多人的反对，认为它破坏了巴黎的美感。但现在它已经成为巴黎和法国的象征。',
    '庞贝遗址': '公元79年8月24日，维苏威火山突然爆发，庞贝城被火山灰和熔岩掩埋。直到1748年才被发现，这座古城被完美保存，为我们提供了了解古罗马生活的珍贵窗口。',
    '论坛广场': '这里是古罗马的政治中心，元老院、法庭和神庙都集中在这里。凯撒大帝就是在这里被刺杀，这个广场见证了罗马帝国的兴衰。'
  }

  return storyMap[attractionName] || `这个景点承载着${placeName}深厚的历史文化，每一块石头、每一幅画都诉说着过去的故事，等待着游客去发现和感受。`
}

export default function PlaceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  // 支持字符串ID和数字ID
  const place = findAttractionById(id)

  const gradient = place ? getPlaceGradient(place) : 'from-blue-400 to-cyan-400'
  const imageUrl = place ? getPlaceImageUrl(place) : null

  if (!place) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">景点未找到</h1>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header with back button */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回</span>
            </button>
            <Link
              to="/city/almere"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">首页</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className={`relative h-80 overflow-hidden bg-gradient-to-br ${gradient}`}>
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt={place.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}
        {!imageUrl && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl">{place.emoji}</span>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 opacity-20">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-20">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-white px-4 py-1 rounded-full text-sm font-semibold text-primary-600 shadow-md">
                {place.duration}
              </span>
              <span className="bg-white px-4 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                {place.country}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">{place.name}</h1>
            {place.category !== 'local' && (
              <div className="flex items-center text-white text-lg space-x-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{place.distance}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{place.travelTime}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">关于这个地方</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{place.description}</p>
            </div>

            {/* Highlights - 推荐景点卡片展示 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🌟 推荐景点</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {place.highlights.map((highlight, index) => {
                  // 解析景点名称和描述
                  const [attractionName, attractionDescription] = highlight.split(' - ')

                  // 为每个推荐景点创建丰富的景点对象
                  const attractionData = {
                    name: attractionName || highlight,
                    description: attractionDescription || highlight,
                    emoji: getAttractionEmoji(attractionName || highlight),
                    country: place.country,
                    duration: '1-2小时',
                    recommendationReason: getRecommendationReason(attractionName || highlight, place.name),
                    story: getAttractionStory(attractionName || highlight, place.name),
                    ticketPrice: place.ticketPrice ? {
                      [attractionName || highlight]: '详情请咨询'
                    } : undefined,
                    openingHours: place.openingHours ? {
                      '开放时间': '详情请咨询'
                    } : undefined,
                    historicalSignificance: place.historicalSignificance,
                    famousPeople: place.famousPeople,
                    bestTimeToVisit: place.bestTimeToVisit,
                    accessibility: place.accessibility
                  }

                  return (
                    <AttractionCard
                      key={index}
                      attraction={attractionData}
                      index={index}
                    />
                  )
                })}
              </div>
            </div>

            {/* Tips */}
            {place.tips && place.tips.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🌟 旅行建议</h2>
                <ul className="space-y-3">
                  {place.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg"
                    >
                      <span className="text-yellow-600 font-bold text-lg mt-0.5">💡</span>
                      <span className="text-gray-700 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Information Cards */}
            {(place.ticketPrice || place.openingHours || place.historicalSignificance || place.famousPeople || place.bestTimeToVisit || place.accessibility) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 详细信息</h2>

                {/* Ticket Price */}
                {place.ticketPrice && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🎫</span> 门票价格
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                      {Object.entries(place.ticketPrice).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-700">{key}</span>
                          <span className="font-semibold text-blue-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {place.openingHours && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🕒</span> 开放时间
                    </h3>
                    <div className="bg-green-50 rounded-lg p-4 space-y-2">
                      {Object.entries(place.openingHours).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-700">{key}</span>
                          <span className="font-semibold text-green-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Historical Significance */}
                {place.historicalSignificance && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">📜</span> 历史意义
                    </h3>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{place.historicalSignificance}</p>
                    </div>
                  </div>
                )}

                {/* Famous People */}
                {place.famousPeople && place.famousPeople.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">👤</span> 相关名人
                    </h3>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {place.famousPeople.map((person, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Best Time to Visit */}
                {place.bestTimeToVisit && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🌤️</span> 最佳游览时间
                    </h3>
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{place.bestTimeToVisit}</p>
                    </div>
                  </div>
                )}

                {/* Accessibility */}
                {place.accessibility && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">♿</span> 无障碍设施
                    </h3>
                    <div className="bg-pink-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{place.accessibility}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 位置</h2>
              <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                {typeof window !== 'undefined' && window.google ? (
                  <MapComponent location={place.location} placeName={place.name} />
                ) : (
                  <div className="w-full h-96 bg-gray-100 flex flex-col items-center justify-center space-y-4">
                    <MapPin className="w-16 h-16 text-gray-400" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      在 Google Maps 中打开
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>坐标：</span>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {place.location.lat}, {place.location.lng}
                </code>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Transportation - 只在非本地游览时显示 */}
            {place.category !== 'local' ? (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🚗 交通方式</h2>
                <div className="space-y-3">
                  {place.transport.map((option, index) => {
                    const Icon = transportIcons[option.type] || Train
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{option.method}</p>
                            <p className="text-sm text-gray-600">{option.time}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Quick info */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">距离</span>
                    <span className="font-semibold text-gray-900">{place.distance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">建议时长</span>
                    <span className="font-semibold text-gray-900">{place.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">国家</span>
                    <span className="font-semibold text-gray-900">{place.country}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* 本地游览显示简化信息 */
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🏙️ 本地游览</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      探索{place.name.replace('本地游览', '')}的精彩之处，感受这座城市的独特魅力。
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">国家</span>
                      <span className="font-semibold text-gray-900">{place.country}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">类型</span>
                      <span className="font-semibold text-gray-900">城市观光</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

