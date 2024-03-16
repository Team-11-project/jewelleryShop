import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faInfoCircle, faHeart, faHistory, faAddressBook, faQuestionCircle, faTruck, faSignOutAlt, faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import { Link } from 'react-router-dom'; // Import Link component
import AppNavbar from '../assets/navbar';
import './css/menu.css';

const Profile = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };
  
  const hoverStyle = {
    ':hover': {
      color: 'rgb(255, 217, 119)',
    },
  };
  

  return (
    <>
      <AppNavbar />
      <div className="profile-page">
        <div style={{marginTop:'150px'}}>
          <div
            className="d-flex flex-column justify-content-center align-items-center p-5"
            style={{ flex: '3', paddingRight: '20px' }} // Changed flex value to 3
          >
            <h2 className='text-black text-center mb-5'>M E N U</h2>
            {/* Table with options */}
            <table className="table table-bordered" style={{width:'400px'}}>
              <tbody>
                <tr>
                  <td className="text-center" >
                     USER
                  </td>
                </tr>
                <tr>
                  <td className="text-center" style={{ paddingTop: '20px' }}>
                    <Link style={linkStyle} to="/my-info">
                      <FontAwesomeIcon style={hoverStyle} icon={faInfoCircle} /> My Information
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-center" style={{ paddingTop: '20px' }}>
                    <Link style={linkStyle} to="/my-wishlist">
                      <FontAwesomeIcon style={hoverStyle} icon={faHeart} /> My Wishlist
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-center" style={{ paddingTop: '20px' }}>
                    <Link style={linkStyle} to="/order-history">
                      <FontAwesomeIcon style={hoverStyle} icon={faHistory} /> Order History
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-center" style={{ paddingTop: '20px' }}>
                    <Link style={linkStyle} to="/sign-out">
                      <FontAwesomeIcon style={hoverStyle} icon={faSignOutAlt} /> Sign Out
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;