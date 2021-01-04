import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const GetIntouch = () => {
   return (
      <>
         <Container>
            <div className={Style.GetIntouch}>
               <div className={Style.GetIntouchContent}>
                  <h1>Get in Touch</h1>
                  <h4>
                     Get a custom demo for your needs from our experts and see
                     the platform in action
                  </h4>
                  <div className={Style.ContentBtn}>
                     <Button>Schedule a Demo</Button>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
};

export default GetIntouch;
