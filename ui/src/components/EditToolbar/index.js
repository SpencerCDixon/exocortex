import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import { X, Save as SaveIcon } from 'react-feather';
import styled from 'styled-components';
import { baseIcon } from 'style';

const Save = styled(SaveIcon)`
  ${baseIcon};
`;
const Close = styled(X)`
  ${baseIcon};
`;

class EditToolbar extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex align="center">
        <Box />

        <Flex ml="auto">
          <Box>
            <Save onClick={this.props.onSave} />
          </Box>
          <Box ml={2}>
            <Close onClick={this.props.onClose} />
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default EditToolbar;
