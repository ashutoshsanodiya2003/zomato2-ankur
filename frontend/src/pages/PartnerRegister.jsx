import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";


const PartnerRegister = () => {

  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();

  const businessName = e.target.businessName.value
  const email = e.target.email.value
  const password = e.target.password.value

  console.log(businessName)

const response =   await axios.post("http://localhost:3000/api/auth/food-partner/register",{
    businessName,
    email,
    password
  }, {withCredentials:true})
  console.log(response.data)
  navigate("/create-food")

  };
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Partner sign up</h1>
        <p className="auth-sub">
          Register your food-partner account to manage your menu.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Business name</label>
            <input name="businessName" placeholder="Restaurant or business name" />
          </div>

          <div className="field">
            <label>Contact email</label>
            <input name="email" placeholder="contact@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create a password" />
          </div>

          <div className="actions">
            <div />
            <button className="btn" type="submit">
              Create account
            </button>
          </div>
        </form>

        <div className="small">
          Already registered? <a href="/food-partner/login">Login</a>
        </div>
      </div>
    </main>
  );
};

export default PartnerRegister;
