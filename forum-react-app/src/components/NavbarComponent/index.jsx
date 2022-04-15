import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiBell } from '@mdi/js';
import SearchComponent from '../SearchComponent';
import classNames from 'classnames';
import './styles.scss';
import { Container } from './styles';

const NavbarComponent = ({ menuToggled }) => {
  return (
    <div className={classNames({ navbar: true, 'navbar-expanded': menuToggled})}>
      <Container>
        <SearchComponent />
        <button className="button">Ask Question</button>
        <button className="icon-button">
          <Icon path={mdiBell} size="23px" color="#7884F3" />
        </button>
      </Container>
    </div>
  );
};

NavbarComponent.props = {
  menuToggled: PropTypes.bool
};

NavbarComponent.defaultProps = {
  menuToggled: false
};

export default NavbarComponent;
