import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import withWikiPage from 'util/withWikiPage';
import Editor from 'components/Editor';

class EditWikiPage extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Flex column>
        <Editor page={this.props.page} initialValue={this.props.content} />
      </Flex>
    );
  }
}

export default withWikiPage(EditWikiPage);
