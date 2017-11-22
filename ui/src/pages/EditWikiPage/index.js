import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import withWikiPage from 'util/withWikiPage';
import Editor from 'components/Editor';

class EditWikiPage extends Component {
  render() {
    return (
      <Flex column>
        <Editor initialValue={this.props.content} />
      </Flex>
    );
  }
}

export default withWikiPage(EditWikiPage);
