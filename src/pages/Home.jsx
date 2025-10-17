import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLastCity } from '../utils/storage'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // 重定向到上次访问的城市，如果没有则默认为Almere
    const lastCity = getLastCity()
    navigate(`/city/${lastCity}`, { replace: true })
  }, [navigate])

  return null
}

