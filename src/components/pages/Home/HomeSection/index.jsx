import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const HomeSection = () => {
   return (
      <>
         <div className={Style.SliderAera}>
            <Container>
               <Row>
                  <Col md={6}>
                     <div className={Style.leftContent}>
                        <h1>AUTONOMOUS DATA PLATFORM</h1>
                        <h2>
                           ULTIMATE AND TRULY UNIFIED PLATFORM BUILT FOR DATA
                           MANAGEMENT
                        </h2>
                        <div className={Style.SliderButton}>
                           <Button>Schedule a demo</Button>
                           <Button> Watch Video</Button>
                        </div>
                     </div>
                  </Col>
                       <Col md={6}>
                           img
                  </Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default HomeSection;
