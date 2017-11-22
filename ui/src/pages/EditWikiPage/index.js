import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import withWikiPage from 'util/withWikiPage';
import Editor from 'components/Editor';

class EditWikiPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,

    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  render() {
    const { onSave, onView, content } = this.props;
    return <Editor onView={onView} onSave={onSave} initialValue={content} />;
  }
}

export default withWikiPage(EditWikiPage);
