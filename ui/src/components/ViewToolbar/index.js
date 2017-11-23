import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import { Edit2 } from 'react-feather';
import styled from 'styled-components';
import { colors } from 'style';

const Edit = styled(Edit2)`
  color: ${colors.gray1};

  &:hover {
    cursor: pointer;
    color: ${colors.gray2};
  }
`;

class ViewToolbar extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex align="center">
        <Box />

        <Box ml="auto">
          <Edit onClick={this.props.onEdit} />
        </Box>
      </Flex>
    );
  }
}

export default ViewToolbar;
