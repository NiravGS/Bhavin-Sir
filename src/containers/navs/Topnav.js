import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink as NavL,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from '../../helpers/IntlMessages';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from '../../redux/actions';

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

import { getDirection, setDirection } from '../../helpers/Utils';
import { auth } from '../../helpers/Firebase';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: '',
    };
  }

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
        this.removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };

  addEventsSearch = () => {
    document.addEventListener('click', this.handleDocumentClickSearch, true);
  };

  removeEventsSearch = () => {
    document.removeEventListener('click', this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      this.removeEventsSearch();
      this.setState({
        searchKeyword: '',
      });
    }
  };

  handleSearchInputChange = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };

  handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + '/' + this.state.searchKeyword);
    this.setState({
      searchKeyword: '',
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems,
    );
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  menuTopMenuBar = (menu) => {
    const menus = document.querySelectorAll(
      '.main-menu .scroll .scrollbar-container ul li',
    );
    menus.forEach(item => { item.classList.remove('active'); });

    menus[menu].classList.add('active');

    document
      .querySelector('.sub-menu .scroll .scrollbar-container')
      .classList.add('ps--active-y');

    const subMenu = document.querySelectorAll(
      '.sub-menu .scroll .scrollbar-container ul',
    );
    subMenu.forEach( (item) => {item.classList.remove('d-block');});
    subMenu[menu].classList.add('d-block');

    setTimeout(() => {
      document
        .querySelector('#app-container')
        .classList.add('sub-show-temporary');
    }, 200);
  };

  render() {
    const { containerClassnames, menuClickCount, locale } = this.props;
    return (
      <nav className='navbar fixed-top'>
        <div className='d-flex align-items-center justify-content-start navbar-left'>
          <NavLink
            to='#'
            location={{}}
            className='menu-button d-none d-md-block'
            onClick={(e) =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>

          <NavLink
            to='#'
            location={{}}
            className='menu-button-mobile d-xs-block d-sm-block d-md-none'
            onClick={(e) => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
          <a className='navbar-logo' href='/'>
            <span className='logo d-none d-xs-block' />
            <span className='logo-mobile d-block d-xs-none' />
          </a>
          <div className='top-menu-bar d-inline-block'>
            <Nav>
              <NavItem>
                <NavL
                  href='#'
                  onClick={(e) => {
                    this.menuButtonClick(
                      e,
                      menuClickCount,
                      containerClassnames,
                    );
                    this.menuTopMenuBar(0);
                  }}
                >
                  Data Integration
                </NavL>
              </NavItem>
              <NavItem>
                <NavL
                  href='#'
                  onClick={(e) => {
                    this.menuButtonClick(
                      e,
                      menuClickCount,
                      containerClassnames,
                    );
                    this.menuTopMenuBar(1);
                  }}
                >
                  Data Quality
                </NavL>
              </NavItem>
              <NavItem>
                <NavL
                  href='#'
                  onClick={(e) => {
                    this.menuButtonClick(
                      e,
                      menuClickCount,
                      containerClassnames,
                    );
                    this.menuTopMenuBar(2);
                  }}
                >
                  Data Privacy
                </NavL>
              </NavItem>
              <NavItem>
                <NavL target='_blank' href='/documentation/docs'>
                  Documentation
                </NavL>
              </NavItem>
            </Nav>
          </div>
        </div>

        <div className='navbar-right'>
          <div className='d-inline-block mr-3'>
            <UncontrolledDropdown className='ml-2'>
              <DropdownToggle
                caret
                color='light'
                size='sm'
                className='language-button'
              >
                <span className='name'>{locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className='mt-3' right>
                {localeOptions.map((l) => {
                  return (
                    <DropdownItem
                      onClick={() => this.handleChangeLocale(l.id, l.direction)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          {isDarkSwitchActive && <TopnavDarkSwitch />}

          <div className='header-icons d-inline-block align-middle'>
            <TopnavNotifications />
          </div>
          <div className='user d-inline-block'>
            <UncontrolledDropdown className='dropdown-menu-right'>
              <DropdownToggle className='p-0' color='empty'>
                <span className='name mr-1'>
                  {auth?.currentUser?.displayName}
                </span>
                <span>
                  <img
                    alt='Profile'
                    src='/assets/img/no-profile-picture.jpeg'
                  />
                </span>
              </DropdownToggle>
              <DropdownMenu className='mt-3' right>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale,
  })(TopNav),
);
