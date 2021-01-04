import React from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// Style
import Style from './assest/scss/Style.module.scss'

// icons
import { GoThreeBars } from 'react-icons/go'
import { GrFormClose } from 'react-icons/gr'

const Header = () => {
  const [active, setActive] = React.useState(false)
  const optionRemove = () => {
    document
      .getElementsByTagName('html')[0]
      .removeAttribute('class', `${Style.Noscroll}`)
    setActive(!active)
  }
  const optionAdd = () => {
    document
      .getElementsByTagName('html')[0]
      .setAttribute('class', `${Style.Noscroll}`)
    setActive(!active)
  }

  const fixedText = document.getElementById('myHeader')
  const whenNotFixed = 'I am not a fixed header :('
  const [headerText, setHeaderText] = React.useState(whenNotFixed)
  React.useEffect(() => {
    const header = document.getElementById('myHeader')
    const sticky = header.offsetTop
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add(`${Style.sticky}`)
        if (headerText !== fixedText) {
          setHeaderText(fixedText)
        }
      } else {
        header.classList.remove(`${Style.sticky}`)
        if (headerText !== whenNotFixed) {
          setHeaderText(whenNotFixed)
        }
      }
    })
    return () => {
      window.removeEventListener('scroll', scrollCallBack)
    }
  })
  return (
    <header id='myHeader'>
      <Container >
        <div className={Style.menuContainer}>
          <div className={Style.logo}>
            <Link to='/'>
              <h1>Logo</h1>
            </Link>
          </div>
          <nav className={active ? `${Style.active}` : `${Style.nav}`}>
            <ul>
              <li>
                <Link to='/' onClick={optionRemove}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/' onClick={optionRemove}>
                  Products
                </Link>
              </li>
              <li>
                <Link to='/' onClick={optionRemove}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to='/' onClick={optionRemove}>
                  Schedule a Demo
                </Link>
              </li>
              <li>
                <Button >
                  Portal Login
                </Button>
              </li>
            </ul>
          </nav>
          <div
            className={Style.menuToggle}
            onClick={() => {
              setActive(!active)
            }}
          >
            {active ? (
              <div className={Style.closeIcon} onClick={optionRemove}>
                <GrFormClose />
              </div>
            ) : (
              <div className={Style.menuIcon} onClick={optionAdd}>
                <GoThreeBars />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
