import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Style from "./assest/scss/Style.module.scss";

const DataPrivacy = () => {
   return (
      <>
         <div className={Style.DataSystem}>
            <Container>
               <div className={Style.Content}>
                  <h1>Let's build the smart data system</h1>
                  <p>Take the next in building a high qulality, easy in the same time reliable and scalable data system for all your needs.</p>
               </div>
               <div className={Style.ContentButton}>
                  <Button>
                     Let's get started
                  </Button>
               </div>
            </Container>
         </div>
      </>
   );
};

export default DataPrivacy;
