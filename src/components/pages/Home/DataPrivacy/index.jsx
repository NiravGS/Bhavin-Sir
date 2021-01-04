import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const DataPrivacy = () => {
   return (
      <>
         <div className={Style.DataPrivacy}>
            <div className={Style.title}>Data Privacy</div>
            <Container>
               <Row>
                  <Col md={6}>img</Col>
                  <Col md={6}>
                     <div className={Style.leftContent}>
                        <h4>Data Privacy</h4>
                        <ul>
                           <li>
                              Discover and manage personal and sensitive data
                              across your entire ecosystem
                           </li>
                           <li>Powered by deep learning and ML</li>
                           <li>
                              Generate compliance reports for GDPR, CCPA etc.,
                              with ease
                           </li>
                           <li>
                              Protect sensitive information with custome alerts
                           </li>
                           <li>
                              Manage all requests from one place - privacy
                              portal
                           </li>
                           <li>
                              Automatically catalog sesnsitive information
                              across the ecosystem
                           </li>
                           <li>
                              Pattern recognition and ML based classification
                           </li>
                           <li>Broad connectivity to variuos systems.</li>
                        </ul>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default DataPrivacy;
