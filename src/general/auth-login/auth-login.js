import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './auth.css'
import { RiLoginBoxFill } from "react-icons/ri";
import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button type="button" className="login-button" onClick={() => loginWithRedirect()}><RiLoginBoxFill size={23} /> Login</Button>;
};

export default LoginButton;