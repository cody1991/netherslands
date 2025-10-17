// 临时解决方案：直接使用原始places.js文件
// 这样可以快速恢复所有景点，然后再逐步迁移

import { places } from '../places.js'

// 导出所有景点
export const allAttractions = places

// 根据ID查找景点
export function findAttractionById(id) {
  return places.find(attraction => {
    if (typeof attraction.id === 'string') {
      return attraction.id === id
    }
    return attraction.id === parseInt(id)
  })
}

// 根据出发城市和分类筛选景点
export function getAttractionsByCityAndCategory(departureCity, category) {
  return places.filter(attraction =>
    attraction.departureCity === departureCity &&
    attraction.category === category
  )
}

// 根据出发城市筛选景点
export function getAttractionsByCity(departureCity) {
  return places.filter(attraction =>
    attraction.departureCity === departureCity
  )
}

// 按分类组织景点
export const attractionsByCategory = {
  local: places.filter(p => p.category === 'local'),
  netherlands: places.filter(p => p.category === 'netherlands'),
  international: places.filter(p => p.category === 'international'),
  'long-weekend': places.filter(p => p.category === 'long-weekend'),
}

// 按出发城市组织景点
export const attractionsByDepartureCity = {
  almere: places.filter(p => p.departureCity === 'almere'),
  amsterdam: places.filter(p => p.departureCity === 'amsterdam'),
  paris: places.filter(p => p.departureCity === 'paris'),
  lyon: places.filter(p => p.departureCity === 'lyon'),
  marseille: places.filter(p => p.departureCity === 'marseille'),
  nice: places.filter(p => p.departureCity === 'nice'),
  monaco: places.filter(p => p.departureCity === 'monaco'),
  milan: places.filter(p => p.departureCity === 'milan'),
  verona: places.filter(p => p.departureCity === 'verona'),
  venice: places.filter(p => p.departureCity === 'venice'),
  florence: places.filter(p => p.departureCity === 'florence'),
  pisa: places.filter(p => p.departureCity === 'pisa'),
  rome: places.filter(p => p.departureCity === 'rome'),
  vatican: places.filter(p => p.departureCity === 'vatican'),
  naples: places.filter(p => p.departureCity === 'naples'),
}