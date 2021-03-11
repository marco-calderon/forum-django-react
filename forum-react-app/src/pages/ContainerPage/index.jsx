import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import CenterComponent from '../../components/CenterComponent';
import NavbarComponent from '../../components/NavbarComponent';
import NavigationBarComponent from '../../components/NavigationBarComponent';
import SideBarComponent from '../../components/SideBarComponent';
import { FEED_POSTS } from '../../services/graphql';
import { CenterContainer, EndContainer, Wrapper } from './styles';

const ContainerPage = () => {
  const { data } = useQuery(FEED_POSTS);
  const [menuToggled, setMenuToggled] = useState(true);

  const handleMenuToggle = (toggled) => {
    setMenuToggled(toggled);
  }

  return (
    <Wrapper>
      <NavigationBarComponent onMenuToggle={handleMenuToggle} />
      <CenterContainer>
        <NavbarComponent menuToggled={menuToggled} />
        <CenterComponent posts={data && data.feedPosts} menuToggled={menuToggled} /> 
      </CenterContainer>
      <EndContainer>
        <SideBarComponent />
      </EndContainer>
    </Wrapper>
  );
};

export default ContainerPage;
