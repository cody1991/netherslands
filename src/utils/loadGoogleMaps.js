// Load Google Maps API script
export const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      resolve(window.google.maps)
      return
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google.maps))
      existingScript.addEventListener('error', reject)
      return
    }

    // Create and load script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true

    script.addEventListener('load', () => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps)
      } else {
        reject(new Error('Google Maps API failed to load'))
      }
    })

    script.addEventListener('error', () => {
      reject(new Error('Failed to load Google Maps script'))
    })

    document.head.appendChild(script)
  })
}

