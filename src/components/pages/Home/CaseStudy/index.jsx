import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const CaseStudy = () => {
   return (
      <>
         <div className={Style.CaseStudy}>
            <div className={Style.title}>Featured Case Studies</div>
            <Container>
               <Row>
                  <Col md={4}>
                     <div className={Style.CaseStudyBlog}>
                        <div className={Style.StudyImg}></div>
                        <div className={Style.Content}>
                           <p>for now, just have some lorem ipsum here</p>
                        </div>
                     </div>
                  </Col>
                  <Col md={4}>
                     <div className={Style.CaseStudyBlog}>
                        <div className={Style.StudyImg}></div>
                        <div className={Style.Content}>
                           <p>for now, just have some lorem ipsum here</p>
                        </div>
                     </div>
                  </Col>
                  <Col md={4}>
                     <div className={Style.CaseStudyBlog}>
                        <div className={Style.StudyImg}></div>
                        <div className={Style.Content}>
                           <p>for now, just have some lorem ipsum here</p>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default CaseStudy;
