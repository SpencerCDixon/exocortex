import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import { Trash2, Edit2 } from 'react-feather';
import styled from 'styled-components';
import { baseIcon, strokeIcon } from 'style';

const Edit = styled(Edit2)`
  ${baseIcon};
`;

const Trash = styled(Trash2)`
  ${strokeIcon};
  fill: none;
`;

class ViewToolbar extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex align="center">
        <Box />

        <Box ml="auto">
          <Edit onClick={this.props.onEdit} />
        </Box>
        <Box ml={2}>
          <Trash onClick={this.props.onDelete} />
        </Box>
      </Flex>
    );
  }
}

export default ViewToolbar;
