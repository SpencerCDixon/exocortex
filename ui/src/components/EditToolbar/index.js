import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import { Save as SaveIcon } from 'react-feather';
import styled from 'styled-components';
import { colors } from 'style';

const Save = styled(SaveIcon)`
  color: ${colors.gray1};

  &:hover {
    cursor: pointer;
    color: ${colors.gray2};
  }
`;

class EditToolbar extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex align="center">
        <Box />

        <Box ml="auto">
          <Save onClick={this.props.onSave} />
        </Box>
      </Flex>
    );
  }
}

export default EditToolbar;
