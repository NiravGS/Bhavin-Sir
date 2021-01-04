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
                  <Col md={6}>img</Col>
                  <Col md={6}>
                     <div className={Style.leftContent}>
                        <h4>Data Integration</h4>
                        <ul>
                           <li>
                              Metadata Driven framework that automates building
                              ingestion pipelines.
                           </li>
                           <li>
                              Simplify the process of building complex and
                              scalable data migration and ELT/ETL pipelines all
                              with a few clicks
                           </li>
                           <li>
                              Configure and maintain various systems, only once.
                           </li>
                           <li>
                              Implementing your transformations with no coding
                           </li>
                           <li>
                              Create and maintain the datalake in a more useful
                              and organized way
                           </li>
                           <li>
                              Integrated with Data Quality and Data Privacy
                           </li>
                           <li>
                              Manage all your processes in a highly governed
                              ecosystem
                           </li>
                        </ul>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default HomeSection;
