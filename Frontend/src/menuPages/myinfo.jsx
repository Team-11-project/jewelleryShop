import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppNavbar from '../assets/navbar';

const MyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <AppNavbar />

      <div className="myinfo-page d-flex justify-content-center align-items-center vh-100">
        <div className="container">
          <div className="card rounded-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} size="2x" style={{ color: '#ffd977' }} />
                <div className="ms-3">
                  <h5 className="card-title">User Name</h5>
                  {isEditing ? (
                    <>
                      <input type="text" className="form-control" placeholder="Enter Username" />
                      <input type="email" className="form-control" placeholder="Enter Email" />
                      <input type="tel" className="form-control" placeholder="Enter Phone Number" />
                      <input type="date" className="form-control" placeholder="Enter Date of Birth" />
                      <input type="text" className="form-control" placeholder="Enter Address" />
                    </>
                  ) : (
                    <>
                      <p className="card-text">Email@example.com</p>
                      <p className="card-text">Phone Number</p>
                      <p className="card-text">Date of Birth</p>
                      <p className="card-text">Address</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              {isEditing ? (
                <button className="btn btn-outline-primary btn-circle">Conferma</button>
              ) : (
                <button onClick={handleEditClick} className="btn btn-outline-primary btn-circle">
                  <FontAwesomeIcon icon={faPencilAlt} size="lg" /> Modifica
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfo;
