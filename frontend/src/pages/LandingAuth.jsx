import '../styles/auth.css'

const LandingAuth = () => {
  return (
    <main className="auth-page">
      <div className="auth-card" style={{textAlign: 'center'}}>
        <h1>Welcome</h1>
        <p className="auth-sub">Choose how you'd like to continue</p>

        <div style={{display:'flex', gap:12, flexDirection:'column', marginTop:12}}>
          <a className="btn" href="/user/register">Register as normal user</a>
          <a className="btn" href="/food-partner/register">Register as food partner</a>
        </div> 

        <div className="small" style={{marginTop:18}}>
          Already have an account? <a href="/user/login">User login</a> • <a href="/food-partner/login">Partner login</a>
        </div>
      </div>
    </main>
  )
}

export default LandingAuth
