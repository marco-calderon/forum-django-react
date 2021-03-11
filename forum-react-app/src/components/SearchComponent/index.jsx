import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

import { Container, SearchIcon, SearchInput } from './styles';

const SearchComponent = () => {
  return (
    <Container>
      <SearchIcon>
        <Icon path={mdiMagnify} size="17px" color="#656C9E" />
      </SearchIcon>
      <SearchInput type="text" placeholder="Search" />
    </Container>
  );
};

export default SearchComponent;
