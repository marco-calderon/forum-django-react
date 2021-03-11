import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountMultiple, mdiChatProcessing, mdiCog, mdiDotsHorizontalCircle, mdiHome, mdiStar, mdiTag } from '@mdi/js';
import { Container, LogoContainer, NavigationBar, NavigationBarItem, NavigationBarItemIcon, NavigationBarItemLabel } from './styles';
import logo from '../../assets/img/logo.png';
import TrialComponent from '../TrialComponent';

const NavigationBarComponent = ({ onMenuToggle }) => {
  const [menuExpanded, setMenuExpanded] = useState(true);

  const handleExpandMenu = () => {
    onMenuToggle(!menuExpanded);
    setMenuExpanded(!menuExpanded);
  }

  return (
    <Container expanded={menuExpanded}>
      <LogoContainer onClick={handleExpandMenu}>
        <img src={logo} alt="" />
      </LogoContainer>
      <NavigationBar expanded={menuExpanded}>
        <NavigationBarItem active>
          <NavigationBarItemIcon>
            <Icon path={mdiHome} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Home
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiChatProcessing} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Questions
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiAccountMultiple} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Users
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiTag} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Tags
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiDotsHorizontalCircle} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Unanswered
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiAccount} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Profile
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiStar} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Starred
          </NavigationBarItemLabel>
        </NavigationBarItem>
        <NavigationBarItem>
          <NavigationBarItemIcon>
            <Icon path={mdiCog} size={1}/>
          </NavigationBarItemIcon>
          <NavigationBarItemLabel>
            Settings
          </NavigationBarItemLabel>
        </NavigationBarItem>
      </NavigationBar>
      <TrialComponent expanded={menuExpanded} />
    </Container>
  );
};

NavigationBarComponent.defaultProps = {
  onMenuToggle: () => {}
};

export default NavigationBarComponent;
