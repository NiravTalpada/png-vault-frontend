import { Link } from 'react-router-dom';
import './footer.css';
import React from "react";
import { Nav, Navbar } from 'react-bootstrap';

export default function Footers() {
  return (
      <div className="footer">
        <div className="links">
          <Navbar className="navbar p-0">
            <Nav className="nav gap-3">
              <Link className='footer-link' to="/terms-of-services">Terms of Service</Link>
              <Link className='footer-link' to="/privacy-policy">Privacy Policy</Link>
              {/* <Link to="/contact">Contact</Link> */}
            </Nav>
          </Navbar>
        </div>
        <div className='copyrightText'>
          <p>Copyright @{(new Date().getFullYear())} Pngvalt. All rights reserved</p>
        </div>
      </div>
  );
}