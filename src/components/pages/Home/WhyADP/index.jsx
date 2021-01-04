import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const HomeSection = () => {
   return (
      <>
         <div className={Style.WhyADP}>
            <div className={Style.title}>Why ADP ?</div>
            <Container>
               <Row>
                  <Col md={6}>
                     <div className={Style.leftContent}>
                        <ul>
                           <li>
                              One stop solution for all your data management
                              activities
                           </li>
                           <li>
                              Metadata Driven Framework with high perfomance and
                              support to various systems
                           </li>
                           <li>
                              Automate the build of datalake in an organized way
                           </li>
                           <li>
                              Achieve all your data tasks with minimal to zero
                              coding
                           </li>
                           <li>Highly Governed and Customizable </li>
                        </ul>
                     </div>
                  </Col>
                  <Col md={6}>img</Col>
                  <div className={Style.analytics}>
                     <Row className="justify-content-center">
                        <Col md={4}>
                           <div className={Style.content}>
                              <h1>90% </h1>
                              <p>
                                 Reduction in timetaken to build data pipeline
                              </p>
                           </div>
                        </Col>
                        <Col md={4}>
                           <div className={Style.content}>
                              <h1>90% </h1>
                              <p>
                              Reduction in timetaken to maintain quality data
                              </p>
                           </div>
                        </Col>
                        <Col md={4}>
                           <div className={Style.content}>
                              <h1>90% </h1>
                              <p>
                              Reduction in timetaken to Identify, set up and manage privacy rules
                              </p>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default HomeSection;
