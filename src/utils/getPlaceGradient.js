// 为不同类型的景点提供不同的渐变色背景（作为图片加载失败时的备用方案）
export function getPlaceGradient(place) {
  // 如果景点有自定义渐变色
  if (place.gradient) {
    return place.gradient
  }

  // 根据国家/类型返回不同的渐变色
  const gradientMap = {
    // 按国家
    '荷兰': 'from-orange-400 via-orange-500 to-red-500',
    '法国': 'from-blue-400 via-indigo-500 to-purple-500',
    '意大利': 'from-green-400 via-emerald-500 to-teal-500',
    '比利时': 'from-yellow-400 via-amber-500 to-orange-500',
    '德国': 'from-gray-700 via-red-600 to-yellow-500',
    '英国': 'from-blue-600 via-indigo-600 to-purple-600',
    '摩纳哥': 'from-red-500 via-rose-500 to-pink-500',
    '梵蒂冈': 'from-yellow-400 via-amber-400 to-orange-400',
    '卢森堡': 'from-sky-500 via-cyan-500 to-blue-600',
  }

  // 按分类
  const categoryGradients = {
    'local': 'from-indigo-500 via-purple-500 to-pink-500',
    'netherlands': 'from-orange-400 to-orange-600',
    'international': 'from-blue-400 via-cyan-500 to-teal-500',
  }

  // 优先使用国家渐变
  if (gradientMap[place.country]) {
    return gradientMap[place.country]
  }

  // 其次使用分类渐变
  if (categoryGradients[place.category]) {
    return categoryGradients[place.category]
  }

  // 默认渐变
  return 'from-blue-400 via-cyan-400 to-teal-400'
}

