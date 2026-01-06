import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './profile.css'

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems || [])
      })
      .catch(err => {
        // If the id lookup fails (404), try fetching the logged-in food-partner
        if (err.response && err.response.status === 404) {
          axios.get(`http://localhost:3000/api/food-partner/me`, { withCredentials: true })
            .then(resp => {
              setProfile(resp.data.foodPartner)
              setVideos(resp.data.foodPartner.foodItems || [])
            })
            .catch(e => {
              console.error('me fetch failed', e)
              const msg = e.response?.data?.message || 'Unable to load profile.'
              setErrorMsg(msg)
              setProfile(null)
            })
        } else {
          console.error(err)
          setErrorMsg(err.response?.data?.message || 'Unable to load profile.')
        }
      })
  }, [id])

  if (!profile) return <div className="partner-profile">{errorMsg ? <div className="error">{errorMsg}</div> : 'Loading...'}</div>

  return (
    <div className="partner-profile">
      <header className="pp-header">
        <div  aria-hidden="true" >

<img className="pp-avatar" src="https://images.unsplash.com/photo-1763718170991-baa67106743b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        </div>
        <div className="pp-info">
          <h2 className="pp-business">{profile.businessName}</h2>
          <div className="pp-address">{profile.email}</div>
        </div>
      </header>

      <section className="pp-metrics">
        <div className="metric">
          <div className="metric-title">Total Meals</div>
          <div className="metric-value">{profile.totalMeals}</div>
        </div>
        <div className="metric">
          <div className="metric-title">Customer Serve</div>
          <div className="metric-value">{profile.customersServed}</div>
        </div>
      </section>

      <section className="pp-videos">
        <div className="videos-header">
          <h3>Your Videos</h3>
        </div>

        {videos.length === 0 && <p className="no-videos">No videos uploaded</p>}

        <div className="videos-grid">
          {videos.map((v, i) => (
            <div
              className="video-card"
              key={v._id || i}
              onClick={() => setSelectedVideo(v.video)}
            >
              <div className="video-preview">
                <video
                  src={v.video}
                  className="preview-video"
                  muted
                  playsInline
                />
                <div className="play-overlay">▶</div>
              </div>
              <div className="video-meta">
                <div className="video-title">{v.title || `Video ${i + 1}`}</div>
              </div>
            </div>
          ))}
        </div>

        {selectedVideo && (
          <div className="video-modal" onClick={() => setSelectedVideo(null)}>
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedVideo(null)}>✕</button>
              <video src={selectedVideo} controls autoPlay className="modal-player" />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile




                 
