// 为景点获取图片URL
// 使用Pexels的免费图片，这些图片URL更稳定可靠
export function getPlaceImageUrl(place) {
  // 如果已经有自定义图片URL，直接使用
  if (place.imageUrl) {
    return place.imageUrl
  }

  // 使用预设的图片映射
  const imageMap = getImageMapping()

  // 优先使用景点ID匹配
  if (imageMap[place.id]) {
    return imageMap[place.id]
  }

  // 其次使用景点名称匹配
  if (imageMap[place.name]) {
    return imageMap[place.name]
  }

  // 没有图片时返回null，使用渐变背景
  return null
}

function getImageMapping() {
  return {
    // ===== 本地游览 - 城市全景 =====
    'almere-local': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&w=800',
    'amsterdam-local': 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&w=800',
    'paris-local': 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&w=800',
    'lyon-local': 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&w=800',
    'marseille-local': 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&w=800',
    'nice-local': 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&w=800',
    'monaco-local': 'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&w=800',
    'milan-local': 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&w=800',
    'verona-local': 'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&w=800',
    'venice-local': 'https://images.pexels.com/photos/1796505/pexels-photo-1796505.jpeg?auto=compress&w=800',
    'florence-local': 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&w=800',
    'pisa-local': 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&w=800',
    'rome-local': 'https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&w=800',
    'vatican-local': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&w=800',
    'naples-local': 'https://images.pexels.com/photos/3566187/pexels-photo-3566187.jpeg?auto=compress&w=800',

    // ===== 景点图片 =====
    '阿姆斯特丹': 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&w=800',
    '羊角村': 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&w=800',
    '海牙': 'https://images.pexels.com/photos/1434608/pexels-photo-1434608.jpeg?auto=compress&w=800',
    '鹿特丹': 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&w=800',
    '乌得勒支': 'https://images.pexels.com/photos/1121782/pexels-photo-1121782.jpeg?auto=compress&w=800',
    '布鲁塞尔': 'https://images.pexels.com/photos/887573/pexels-photo-887573.jpeg?auto=compress&w=800',
    '布鲁日': 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&w=800',
    '科隆': 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&w=800',
    '巴黎': 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&w=800',
    '伦敦': 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&w=800',
    '凡尔赛': 'https://images.pexels.com/photos/2363807/pexels-photo-2363807.jpeg?auto=compress&w=800',
    '卢瓦尔河谷': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&w=800',
    '里昂': 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&w=800',
    '安纳西': 'https://images.pexels.com/photos/1974594/pexels-photo-1974594.jpeg?auto=compress&w=800',
    '马赛': 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&w=800',
    '埃兹': 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&w=800',
    '戛纳': 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&w=800',
    '米兰': 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&w=800',
    '科莫湖': 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&w=800',
    '维罗纳': 'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&w=800',
    '威尼斯': 'https://images.pexels.com/photos/1796505/pexels-photo-1796505.jpeg?auto=compress&w=800',
    '布拉诺岛': 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&w=800',
    '佛罗伦萨': 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&w=800',
    '锡耶纳': 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&w=800',
    '比萨': 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&w=800',
    '罗马': 'https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&w=800',
    '梵蒂冈': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&w=800',
    '那不勒斯': 'https://images.pexels.com/photos/3566187/pexels-photo-3566187.jpeg?auto=compress&w=800',
    '庞贝古城': 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&w=800',
    '阿马尔菲海岸': 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&w=800',
    '卡普里岛': 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&w=800',
  }
}
