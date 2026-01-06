import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'

const UserRegister = () => {

  const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        

    const fullName = e.target.fullName.value
    const email = e.target.email.value
    const password = e.target.password.value

   const response =  await axios.post("http://localhost:3000/api/auth/user/register",
      {fullName,
      email,
      password},
      {withCredentials:true}
    )
    console.log(response.data) 
    navigate("/home") 
    
    }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="auth-sub">Register as a user to start ordering.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input name='fullName' placeholder="Enter Your Name" />
          </div>

          <div className="field">
            <label>Email</label>
            <input name='email' placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input name='password' type="password" placeholder="Create a password" />
          </div>

          <div className="actions">
            <div />
            <button className="btn" type="submit">Create account</button>
          </div>
        </form>

        <div className="small">Already registered? <a href="/user/login">Login</a></div>
      </div>
    </main>
  )
}

export default UserRegister
