import './App.css';
import React from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './common-pages/home/home';
import Pricing from './common-pages/pricing/pricing';
import About from './common-pages/about/about';
import Contact from './common-pages/contact/contact';
import { Auth0Context, useAuth0 } from '@auth0/auth0-react';
import Profile from './pages/profile/profile';
import Cart from './pages/cart/cart';
import Order from './pages/order/order';
import UploadImages from './admin-pages/uploadImages/uploadImages';
import UserList from './admin-pages/userList/userList';
import TermsOfServices from './common-pages/terms-of-service/terms-of-service';
import PrivacyPolicy from './common-pages/privacy-policy/privacy-policy';

export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/pricing" element={<Pricing/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
      <Route exact path="/cart" element={<Cart/>}/>
      <Route exact path="/order" element={<Order/>}/>
      <Route exact path="/uploadimages" element={<UploadImages/>} />
      <Route exact path="/userlist" element={<UserList/>} />
      <Route exact path="/terms-of-services" element={<TermsOfServices/>} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
      {/* <Route exact path="/create" element={<Create/>}/>
      <Route exact path="/update" element={<Update/>}/>
      <Route exact path="/delete" element={<Deletes/>}/> */}
    </Routes>
  );
}