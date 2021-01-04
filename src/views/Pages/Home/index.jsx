import React from "react";
import HomeSection from "../../../components/pages/Home/HomeSection";
import WhyADP from "../../../components/pages/Home/WhyADP";
import Products from "../../../components/pages/Home/Products";
import DataQuality from "../../../components/pages/Home/DataQuality";
import DataPrivacy from "../../../components/pages/Home/DataPrivacy";
import DataSystem from "../../../components/pages/Home/DataSystem";
import CaseStudy from "../../../components/pages/Home/CaseStudy";
import GetInTouch from "../../../components/pages/Home/GetInTouch";
import Style from "./assest/scss/Style.module.scss";

const Home = () => {
   return (
      <>
         <section id={Style.HomeSection}>
            <HomeSection />
         </section>
         <section id={Style.WhyADP}>
            <WhyADP />
         </section>
         <section id={Style.Products}>
            <Products />
         </section>
         <section id={Style.DataQuality}>
            <DataQuality />
         </section>
         <section id={Style.DataPrivacy}>
            <DataPrivacy />
         </section>
         <section id={Style.DataSystem}>
            <DataSystem />
         </section>
         <section id={Style.CaseStudy}>
            <CaseStudy />
         </section>
         <section id={Style.GetInTouch}>
            <GetInTouch />
         </section>
      </>
   );
};

export default Home;
