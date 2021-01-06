import React from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

// Style
import Style from "./assest/scss/Style.module.scss";

// icons
import { GoThreeBars } from "react-icons/go";
import { GrFormClose } from "react-icons/gr";

const Header = () => {
   const [active, setActive] = React.useState(false);
   const optionRemove = () => {
      document
         .getElementsByTagName("html")[0]
         .removeAttribute("class", `${Style.Noscroll}`);
      setActive(!active);
   };
   const optionAdd = () => {
      document
         .getElementsByTagName("html")[0]
         .setAttribute("class", `${Style.Noscroll}`);
      setActive(!active);
   };

  
   return (
      <header id="myHeader">
         <Container>
            <div className={Style.menuContainer}>
               <div className={Style.logo}>
                  <Link to="/">
                     <h1>Logo</h1>
                  </Link>
               </div>
               <nav className={active ? `${Style.active}` : `${Style.nav}`}>
                  <ul>
                     <li>
                        <Link to="/" onClick={optionRemove}>
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link to="/" onClick={optionRemove}>
                           Products
                        </Link>
                     </li>
                     <li>
                        <Link to="/" onClick={optionRemove}>
                           Case Studies
                        </Link>
                     </li>
                     <li>
                        <Link to="/" onClick={optionRemove}>
                           Schedule a Demo
                        </Link>
                     </li>
                     <li className={Style.login_btn}>
                        <Button>Portal Login</Button>
                     </li>
                  </ul>
                  <div className={Style.menuToggle}>
                     <div className={Style.closeIcon} onClick={optionRemove}>
                        <GrFormClose />
                     </div>
                  </div>
               </nav>
               <div
                  className={Style.menuToggle}
                  onClick={() => {
                     setActive(!active);
                  }}
               >
                  <div className={Style.menuIcon} onClick={optionAdd}>
                     <GoThreeBars />
                  </div>
               </div>
            </div>
         </Container>
      </header>
   );
};

export default Header;
