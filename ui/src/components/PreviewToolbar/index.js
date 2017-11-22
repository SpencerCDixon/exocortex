import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import { X as XIcon } from 'react-feather';
import styled from 'styled-components';
import { colors } from 'style';

const X = styled(XIcon)`
  color: ${colors.gray1};

  &:hover {
    cursor: pointer;
    color: ${colors.gray2};
  }
`;

class EditToolbar extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex align="center">
        <Box />

        <Box ml="auto">
          <X onClick={this.props.onClose} />
        </Box>
      </Flex>
    );
  }
}

export default EditToolbar;
