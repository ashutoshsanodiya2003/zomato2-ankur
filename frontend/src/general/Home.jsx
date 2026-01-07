import '../styles/reels.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [videos, setVideos] = useState([])
  const videoRefs = useRef([])

  // Fetch videos
  useEffect(() => {
    axios
      .get('https://zomato2-ankur-backend2.onrender.com/api/food', { withCredentials: true })
      .then(res => {
        if (Array.isArray(res.data.foodItems)) {
          setVideos(res.data.foodItems)
        }
      })
      .catch(console.error)
  }, [])

  // Auto play / pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return

          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.6 }
    )

    videoRefs.current.forEach(video => video && observer.observe(video))
    return () => observer.disconnect()
  }, [videos])

  return (
    <div className="reels-container">
      {videos.map((item, index) => (
        <section className="reel" key={item._id}>
          <video
            ref={el => (videoRefs.current[index] = el)}
            className="reel-video"
            src={item.video}
            muted
            loop
            playsInline
          />

          {/* Bottom overlay */}
          <div className="reel-overlay reel-bottom">
            <p className="reel-description" title={item.description}>
              {item.description}
            </p>

            <Link
              to={`/food-partner/${item.foodPartner}`}
              className="visit-store-btn"
            >
              Visit Store
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
