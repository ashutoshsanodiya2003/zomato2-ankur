import { useState } from 'react'
import './CreateFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [fileName, setFileName] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      setFileName(file.name)
    } else {
      setVideoFile(null)
      setVideoPreview(null)
      setFileName('')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]
    if (file) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      setFileName(file.name)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    if (videoFile) formData.append('video', videoFile)
    formData.append('name', name)
    formData.append('description', description)
    console.log('Submit food:', { name, description, videoFile })
    // TODO: send `formData` to backend API

    const response = await axios.post("https://zomato2-ankur-backend2.onrender.com/api/food/",formData,
      {
        withCredentials:true
      })

      console.log(response.data)
      navigate("/home")


    // reset form
    setVideoFile(null)
    setVideoPreview(null)
    setName('')
    setDescription('')
    e.target.reset()
  }

  return (
    <div className="create-food-container">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h2>Create Food</h2>

        <label className="form-label">Video</label>

        <div
          className="video-uploader"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input id="videoInput" type="file" accept="video/*" onChange={handleVideoChange} />
          <label htmlFor="videoInput" className="uploader-label">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 7a2 2 0 012-2h8l4 4v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 11l4-3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="uploader-text">Tap to upload or drag a video here</div>
            {fileName ? <div className="video-filename">{fileName}</div> : <div className="uploader-sub">MP4, WEBM — up to 50MB</div>}
          </label>
        </div>

        {videoPreview && (
          <div className="video-preview">
            <video src={videoPreview} controls width="320" />
          </div>
        )}

        <label className="form-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food name"
          required
        />

        <label className="form-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the food"
          rows={4}
          required
        />

        <button type="submit" className="submit-btn">Create</button>
      </form>
    </div>
  )
}

export default CreateFood
