import React from 'react'
import AttractionCard from '../components/AttractionCard'

// 测试数据
const testAttraction = {
  name: '梵高博物馆',
  description: '专门展示梵高作品的博物馆，拥有世界上最多的梵高画作收藏，包括《向日葵》和《星夜》等名作',
  emoji: '🎨',
  country: '荷兰',
  duration: '2-3小时',
  recommendationReason: '这里收藏了世界上最多的梵高作品，是艺术爱好者必访的圣地，能够近距离欣赏《向日葵》和《星夜》等传世名作。',
  story: '梵高生前只卖出了一幅画，却在死后成为世界上最著名的画家之一。这座博物馆收藏了他200多幅画作，包括著名的《向日葵》系列，每一幅画都诉说着这位天才画家的内心世界。',
  ticketPrice: {
    '成人票': '20欧元',
    '学生票': '10欧元',
    '儿童票': '免费'
  },
  openingHours: {
    '周一至周四': '9:00-18:00',
    '周五': '9:00-22:00',
    '周末': '9:00-18:00'
  },
  historicalSignificance: '梵高博物馆是世界上最重要的梵高作品收藏地，展示了这位荷兰印象派大师的艺术生涯',
  famousPeople: ['文森特·梵高', '提奥·梵高'],
  bestTimeToVisit: '春季和秋季，避开夏季旅游高峰',
  accessibility: '博物馆有完整的无障碍设施，包括轮椅通道和电梯'
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">景点卡片测试</h1>

        {/* 单个卡片测试 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">单个卡片测试</h2>
          <div className="max-w-md">
            <AttractionCard attraction={testAttraction} index={0} />
          </div>
        </div>

        {/* 多个卡片测试 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">多个卡片测试</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map(index => (
              <AttractionCard
                key={index}
                attraction={testAttraction}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* 不同数据测试 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">不同数据测试</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AttractionCard
              attraction={{
                name: '简单景点',
                description: '这是一个只有基本信息的景点',
                emoji: '🏛️',
                country: '荷兰',
                duration: '1小时'
              }}
              index={0}
            />
            <AttractionCard
              attraction={{
                name: '完整景点',
                description: '这是一个包含所有详细信息的景点',
                emoji: '🎭',
                country: '法国',
                duration: '半天',
                ticketPrice: {
                  '成人票': '25欧元',
                  '学生票': '15欧元'
                },
                openingHours: {
                  '每日': '10:00-18:00'
                },
                historicalSignificance: '这是一个具有重要历史意义的景点',
                famousPeople: ['名人1', '名人2', '名人3'],
                bestTimeToVisit: '最佳游览时间是春季',
                accessibility: '有完整的无障碍设施'
              }}
              index={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
