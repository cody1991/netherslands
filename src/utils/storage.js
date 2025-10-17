// localStorage 工具函数，用于持久化用户偏好

const STORAGE_KEYS = {
  LAST_CITY: 'travel_last_city',
  LAST_CATEGORY: 'travel_last_category',
}

// 保存最后访问的城市
export function saveLastCity(cityId) {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_CITY, cityId)
  } catch (error) {
    console.error('Failed to save city to localStorage:', error)
  }
}

// 获取最后访问的城市
export function getLastCity() {
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_CITY) || 'almere'
  } catch (error) {
    console.error('Failed to get city from localStorage:', error)
    return 'almere'
  }
}

// 保存最后选择的分类（每个城市独立保存）
export function saveLastCategory(cityId, category) {
  try {
    const key = `${STORAGE_KEYS.LAST_CATEGORY}_${cityId}`
    localStorage.setItem(key, category)
  } catch (error) {
    console.error('Failed to save category to localStorage:', error)
  }
}

// 获取最后选择的分类
export function getLastCategory(cityId) {
  try {
    const key = `${STORAGE_KEYS.LAST_CATEGORY}_${cityId}`
    return localStorage.getItem(key) || 'local'
  } catch (error) {
    console.error('Failed to get category from localStorage:', error)
    return 'local'
  }
}

// 清除所有存储的数据（用于重置）
export function clearAllStorage() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  } catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}

