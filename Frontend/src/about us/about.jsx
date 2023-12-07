import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";


const About = () => {
  return (
    <>
      {/* About Us Section */}
      <div className="container-fluid about-section">
        <div className="row mt-5">
          <div
            className="col p-0 d-flex align-items-center justify-content-center"
            id="boxBlue"
          >
            <div className="text-center p-5 text-white">
              <h1>About Us</h1>
              <p>
                Explore the world of Regalia and get involved. Let’s work
                towards breaking barriers, one fine piece at a time.
              </p>
            </div>
          </div>
          <div className="col p-0 max-height-100">
            <div className="image-container mt-0">
              <img
                src={img1}
                alt=""
                className="img-fluid"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-fluid mission-section">
        <div className="row">
          <div className="text-center text-container">
            <h1>Our Mission</h1>
            <p>
              “We are redefining luxury in the world of fine jewelry by offering
              meticulously crafted, ethically-sourced pieces that transcend time
              and trends.”
            </p>
          </div>
        </div>
        <div className="row ">
          <div className="col">
            <div className="image-container mt-0">
              <img src={img2} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col">
            <div className="image-container mt-0">
              <img src={img3} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col">
            <div className="image-container mt-0">
              <img src={img4} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* OUR Values section */}
      <div className="container-fluid values-section">
        <div className="row">
          <div className="text-center text-container">
            <h1>Our Values</h1>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col">
            <div className="image-container mt-0">
              <img src={img5} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col">
            <div className="image-container mt-0">
              <img src={img6} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col">
            <div className="image-container mt-0">
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
              <h1>Our Vision</h1>

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
              <h1>Our community</h1>

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

      {/* Join us Section */}
      <div className="container-fluid values-section">
        <div className="row blue">
          <div className="col p-5 d-flex align-items-center justify-content-center">
            <div className="text-center text-container ">
              <h1>Interesed joining us?</h1>

              <p className="text-white">
                We're on the lookout for passionate individuals to join the
                growing Regalia family. While we value skills and experience,
                your beliefs, character, and attitude are what truly matter to
                us. Elevate your career with Regalia, where your unique
                qualities contribute to our legacy of responsible luxury.
              </p>

              <h5>
                Sign up to our newsletter to be the first to hear about new
                releases.
              </h5>
              <form>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <button type="button" class="btn btn-primary mt-3">
                    Primary
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
