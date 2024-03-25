import React from 'react';
import './about.css';
import { Container, Row, Col } from 'react-bootstrap';
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import img4 from "./img4.png";
import img5 from "./img5.png";
import img6 from "./img6.png";
import img7 from "./img7.png";
import img8 from "./img8.png";
import AppNavbar from "../assets/navbar";
import Footer from '../assets/footer';

function AboutUs() {
  return (
    <>
      <AppNavbar />
      <div className="heroSection">
        <div className="heroIcon">
          <img src={img1} alt="image" />
        </div>
        <div className="heroText">
          <p className='t1'>Regalia</p>
          <p className='t2'>Explore the world of Regalia and get involved. Let’s work towards breaking barriers, one fine piece at a time.</p>
        </div>
      </div>

      <div className="mission">
        <p className='ti'> Our Mission </p>
        <p>Our mission is to deliver uniquely crafted, high-quality jewellery that celebrates life's special moments. We combine traditional craftsmanship with contemporary design, ensuring each piece tells a personal story with elegance and style.</p>
      </div>
      <div className="imageSection1">
        <img src={img3} alt="" />
        <img src={img2} alt="" />
        <img src={img4} alt="" />
      </div>

      <div className="mission">
        <p className='ti'> Our Values </p>
        <p>The principles that guide our craftsmanship, community, and commitment to sustainability.</p>
      </div>

      <div className="imageSection1">
        <div className="imgCrd">
          <img src={img5} alt="" />
          <div className="txt">
            <p className='txt-title'>Artistry & Craftmanship</p>
            <p>Every piece is a testament to our artisans' mastery, reflecting unparalleled skill and attention to detail.</p>
          </div>
        </div>
        <div className="imgCrd">
          <img src={img6} alt="" />
          <div className="txt">
            <p className='txt-title'>Sustainability</p>
            <p>We're committed to ethical sourcing and fostering a sustainable future for fashion.</p>
          </div>
          <div className="imgCrd">
            <img src={img7} alt="" />
            <div className="txt">
              <p className='txt-title'>Community Engagement</p>
              <p>Regalia isn't just a brand; it's a community of passionate individuals who share a vision for a better world.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="communitySect">
        <img src={img8} alt="" />

        <div className="community">
          <p className='ti'>Our Community</p>
          <p className='b'>Welcome to our Regalia Community—where diversity, achievement,
            and shared values take center stage. Whether you're a cherished customer,
            a skilled artisan, or an influencer, you're not just welcome; you're
            embraced.
            <br />

            <br />At Regalia, we celebrate inclusivity and invite collaboration.
            Join us in shaping the legacy of responsible luxury. It's a Regalia
            gathering, and you're an honored guest. Connect with us for new
            possibilities and shared visions.

          </p>
        </div>

      </div>

      <Footer />

    </>
  )
}
export default AboutUs;
