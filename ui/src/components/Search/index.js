import React from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from 'react-feather';

const SearchInput = styled.input`
  background: #141618;
  color: #696969;
  border: none;
  border-radius: 3px;
  outline: none;
  padding: 4px 8px;

  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  background: #141618;
  color: #141618;
  border-radius: 3px;
  padding-left: 5px;
`;

function Search(props) {
  return (
    <Wrapper>
      <SearchIcon color="#696969" />
      <SearchInput {...props} />
    </Wrapper>
  );
}

export default Search;
