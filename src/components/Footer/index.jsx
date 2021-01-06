import React from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

// Style
import Style from "./assest/scss/Style.module.scss";

const Footer = () => {
   return (
      <>
         <footer>
            <Container className={Style.footerContainer}>
               <Row>
                  <Col md={3}>
                     <div className={Style.footerMain}>
                        <div className={Style.footerTitle}>Products</div>
                        <ul>
                           <li>
                              <a href="#">Data Integration</a>
                           </li>
                           <li>
                              <a href="#">Data Quality</a>
                           </li>
                           <li>
                              <a href="#">Data Privacy</a>
                           </li>
                        </ul>
                     </div>
                  </Col>
                  <Col md={3}>
                     <div className={Style.footerMain}>
                        <div className={Style.footerTitle}>Resources</div>
                        <ul>
                           <li>
                              <a href="#">Blog</a>
                           </li>
                           <li>
                              <a href="#">Events</a>
                           </li>
                           <li>
                              <a href="#">Webinars</a>
                           </li>
                           <li>
                              <a href="#">News</a>
                           </li>
                        </ul>
                     </div>
                  </Col>
                  <Col md={2}>
                     <div
                        className={`${Style.footerMain} ${Style.footerThree}`}
                     >
                        <div className={Style.footerTitle}>Company</div>
                        <ul>
                           <li>
                              <a href="#">Why Wavicle ?</a>
                           </li>
                           <li>
                              <a href="#">About Us</a>
                           </li>
                           <li>
                              <a href="#">LeaderShip</a>
                           </li>
                           <li>
                              <a href="#">Career</a>
                           </li>
                           <li>
                              <a href="#">Contact</a>
                           </li>
                           <li>
                              <a href="#">News</a>
                           </li>
                        </ul>
                     </div>
                  </Col>
                  <Col md={4}>
                     <div className={Style.footerMain}>
                        <div className={`${Style.footerTitle} ${Style.footerLast}`}>Got a message?</div>
                        <form>
                           <div className={Style.firstInput}>
                              <Input
                                 type="text"
                                 name="name"
                                 id="exampleEmail"
                                 placeholder="Name"
                                 className={Style.InputAreaFooter}
                              />
                              <Input
                                 type="email"
                                 name="email"
                                 id="exampleEmail"
                                 placeholder="Email"
                                 className={Style.InputAreaFooter}
                              />
                           </div>
                           <div className={Style.SecondInput}>
                              <Input
                                 type="text"
                                 name="subject"
                                 id="exampleEmail"
                                 placeholder="Subject"
                                 className={Style.InputAreaFooter}
                              />
                           </div>
                           <div className={Style.ThirdInput}>
                              <Input
                                 type="textarea"
                                 name="email"
                                 id="exampleEmail"
                                 placeholder="Your Message"
                                 className={Style.InputAreaFooter}
                              />
                           </div>
                           <div className={Style.footerBtn}>
                              <Button>Button</Button>
                           </div>
                        </form>
                     </div>
                  </Col>
               </Row>
            </Container>
         </footer>
         <div className={Style.copyRight}>
            <Container>
               <div className={Style.footerArea}>
                  <div>@2020 copyright</div>
                  <div>Icon</div>
               </div>
            </Container>
         </div>
      </>
   );
};

export default Footer;
