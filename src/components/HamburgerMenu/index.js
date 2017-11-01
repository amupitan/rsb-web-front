import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RSBButton from '../ui/RSBButton';
import './style.css';
import UserDisplay from './UserDisplay';

const HamburgerMenu = ({ views, onClick, menu, width, userInfo }) => {
  if (menu) {
    return menuGenerator(width)(views, onClick, userInfo)
  }
  return (
    <RSBButton
      glyphicons="glyphicon glyphicon-menu-hamburger"
      onClickFunction={onClick}
      className="test-hamburger"
    />
  );
}

const menuGenerator = (width) => {
  return (views, onClick, userInfo) => {
    return (
      <div className="rsb-menu" style={{ width: width }}>
        <UserDisplay
          user={userInfo}
        />
        <div className='menu-option'>
          {views.map((view, i) => (
            <MenuOption key={`${view.name}-menu-${i}`} name={view.name} path={view.path} onClick={onClick} />
          ))}
        </div>
        <span className="menu-close" onClick={onClick}>&times;</span>
      </div>
    )
  };
};

const MenuOption = ({ name, path, onClick }) => (
  <div onClick={onClick} >
    <span className='menu-option'>
      <Link to={'/' + path}>{name}</Link>
    </span>
  </div>
);

HamburgerMenu.propTypes = {
  views: PropTypes.array,
  onClick: PropTypes.func,
  menu: PropTypes.bool.isRequired,
  width: PropTypes.string,
  userInfo: PropTypes.object
}

HamburgerMenu.defaultProps = {
  width: '250px',
  views: [],
  onClick: () => { },
}

MenuOption.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  onClick: PropTypes.func,
}

export default HamburgerMenu;
