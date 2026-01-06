import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
/*
create register and login page for the user and food-partner , use same css
 file in all the four pages , use css variable for centralize theme create variables 
 in seperate css file . i want the UI design simple, minimle and seamless with 
 and dark feature according to system settings. no need to write the logics like 
 OnSubmit just a create the UI
*/
import LandingAuth from "../pages/LandingAuth";
import PartnerLogin from "../pages/PartnerLogin";
import PartnerRegister from "../pages/PartnerRegister";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import Home from "../general/Home";
import CreateFood from "../food-partner/CreateFood";
import Profile from "../food-partner/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingAuth />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/home" element={<Home />} />

        <Route path="/create-food" element={<CreateFood />} />

        <Route path="/food-partner/:id" element={<Profile />} />



      </Routes>
    </Router>
  );
};

export default AppRoutes;
