import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "./about.css";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import img4 from "./img4.png";
import img5 from "./img5.png";
import img6 from "./img6.png";
import img7 from "./img7.png";
import img8 from "./img8.png";
import AppNavbar from "../assets/navbar";

const About = () => {
  return (
    <>
      <AppNavbar />
      {/* About Us Section */}
      <div className="container-fluid about-section">
        <div className="row">
          <div className="col-md-6 p-0 align-items-center justify-content-centre" id="boxBlue">
            <div className="text-center p-0 text-white">
              <div className="image-container my-5">
                <img
                  src={img1}
                  alt=""
                  className="img-fluid mt-5"
                  style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center p-5" id="boxBlue">
            <div className="text-center text-white">
              <h1>Regalia</h1>
              <p>
                Explore the world of Regalia and get involved. Let’s work towards
                breaking barriers, one fine piece at a time.
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* Mission Section */}
      <div className="container-fluid mission-section">
        <div className="row">
          <div className="text-center text-container">
            <h2>Our Mission</h2>
            <p>
              “We are redefining luxury in the world of fine jewelry by offering
              meticulously crafted, ethically-sourced pieces that transcend time
              and trends.”
            </p>
          </div>
        </div>
        <div className="row px-5">
          <div className="col img px-5">
            <div className="image-container  px-5 mt-0">
              <img src={img2} alt="" class="img-fluid float-right" />
            </div>
          </div>
          <div className="col img px-5">
            <div className="image-container px-5 mt-0">
              <img src={img3} alt="" class="img-fluid float-center" />
            </div>
          </div>
          <div className="col img px-5" >
            <div className="image-container px-5 mt-0">
              <img src={img4} alt="" class="img-fluid float-left" />
            </div>
          </div>
          <div className="text-center text-container mt-4">
            <h4>ELEVATING JEWELLERY BEYOND LUXURY</h4>
          </div>
        </div>
      </div>

      {/* OUR Values section */}
      <div className="container-fluid values-section">
        <div className="row">
          <div className="text-center text-container">
            <h2>Our Values</h2>
          </div>
        </div>
        <div className="row px-5">
          <div className="col img px-10">
            <div className="image-container px-5 mt-0">
              <img src={img5} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col px-10">
            <div className="image-container px-5 mt-0">
              <img src={img6} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col px-10">
            <div className="image-container px-5 mt-0">
              <img src={img7} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* Visions Section */}
      <div className="container-fluid visions-section">
        <div className="row blue">
          <div className="col p-5 d-flex align-items-center justify-content-center">
            <div className="text-center text-container text-white">
              <h2>Our Vision</h2>

              <p>
                Regalia envisions a world where luxury is not just a status
                symbol but a conscious choice. We aspire to be the premier
                destination for those who seek more than just beautiful
                jewelry—they seek a connection to a legacy of responsible
                luxury. Our vision is to lead the transformation of the jewelry
                industry, setting new standards for ethics, sustainability, and
                exquisite design. Through Regalia, we aim to inspire a global
                community that celebrates the true essence of luxury—one that is
                founded on timeless beauty, ethical integrity, and the enduring
                allure of finely crafted jewelry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="container-fluid values-section">
        <div className="row">
          <div className="col p-5 d-flex align-items-center justify-content-center">
            <div className="text-center text-container px-4">
              <h2>Our Community</h2>

              <p>
                Our Regalia Community? That’s you. Welcome to our Regalia
                Community—where diversity, achievement, and shared values take
                center stage. Whether you're a cherished customer, a skilled
                artisan, or an influencer, you're not just welcome; you're
                embraced. At Regalia, we celebrate inclusivity and invite
                collaboration. Join us in shaping the legacy of responsible
                luxury. It's a Regalia gathering, and you're an honored guest.
                Connect with us for new possibilities and shared visions{" "}
              </p>
            </div>
          </div>
          <div className="col my-5">
            <div className="image-container mt-0 text-center">
              <img src={img8} alt="" className="img-fluid w-50 mx-auto" />
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default About;
