import { useEffect, useRef } from 'react'

export default function MapComponent({ location, placeName }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }],
        },
      ],
    })

    // Add marker
    new window.google.maps.Marker({
      position: location,
      map: map,
      title: placeName,
      animation: window.google.maps.Animation.DROP,
    })

    mapInstanceRef.current = map
  }, [location, placeName])

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-lg"
      style={{ minHeight: '256px' }}
    />
  )
}

