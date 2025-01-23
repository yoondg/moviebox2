import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.styles.css';

const Footer = () => {
  return (
    <footer>
      <Container className="text-center py-4">
        <Row className="mb-3">
          <Col className="d-flex justify-content-center">
            <Link to="#" className="mx-2 footer-icon"><FaFacebookF /></Link>
            <Link to="#" className="mx-2 footer-icon"><FaInstagram /></Link>
            <Link to="#" className="mx-2 footer-icon"><FaTwitter /></Link>
            <Link to="#" className="mx-2 footer-icon"><FaYoutube /></Link>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex flex-column flex-md-row align-items-center justify-content-center">
            <Link to="#" className="footer-link mb-2 mb-md-0 mx-md-2">Conditions of Use</Link>
            <Link to="#" className="footer-link mb-2 mb-md-0 mx-md-2">Privacy & Policy</Link>
            <Link to="#" className="footer-link mb-2 mb-md-0 mx-md-2">Press Room</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="footer-copyright">&copy; 2024 MOVIE BOX by WEB303 CLASS</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;