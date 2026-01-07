import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";


const PartnerLogin = () => {
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("https://zomato2-ankur-backend2.onrender.com/api/auth/food-partner/login",{
      email,
      password
    },
  {withCredentials:true})

  console.log(response.data)

  navigate("/create-food")

  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Partner login</h1>
        <p className="auth-sub">Sign in to manage your menu and orders.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input name="email" placeholder="contact@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <div />
            <button className="btn" type="submit">
              Sign in
            </button>
          </div>
        </form>

        <div className="small">
          New partner? <a href="/food-partner/register">Create account</a>
        </div>
      </div>
    </main>
  );
};

export default PartnerLogin;
