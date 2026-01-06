import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/reels.css'

const Saved = () => {
  // Placeholder saved page - shows saved items in a simple list/grid
  return (
    <div className="saved-page">
      <header className="saved-header">
        <h2>Saved</h2>
      </header>

      <main className="saved-list">
        <p className="muted">You haven't saved anything yet.</p>
        <Link to="/home" className="visit-store-btn" style={{marginTop:12}}>Browse Reels</Link>
      </main>
    </div>
  )
}

export default Saved
