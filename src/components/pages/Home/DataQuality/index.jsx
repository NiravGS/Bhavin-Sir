import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const HomeSection = () => {
   return (
      <>
         <div className={Style.product}>
            <div className={Style.title}>Products</div>
            <Container>
               <Row>
                  <Col md={6}>
                     <div className={Style.leftContent}>
                        <h4>Data Quality</h4>
                        <ul>
                           <li>ML powered system with data stewardship</li>
                           <li>
                              Fully managed DQ interactive dashboard for better
                              decision making.
                           </li>
                           <li>
                              26 + data quality checks by slicing and dicing the
                              data deep till column level.
                           </li>
                           <li>
                              Create your custom data quality rules with just
                              few clicks.
                           </li>
                           <li>
                              Interactive User-friendly UI to create complex
                              data quality rules with knowledge on data and no
                              coding
                           </li>
                           <li>
                              Broad data source connectivity with support for
                              cloud and native databases along with cloud-based
                              file storage systems
                           </li> 
                        </ul>
                     </div>
                  </Col>
                  <Col md={6}>img</Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default HomeSection;
