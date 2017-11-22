import React, { Component } from 'react';
import Markdown from 'components/Markdown';
import { Flex, Box } from 'reflexbox';
import withWikiPage from 'util/withWikiPage';
import isHotkey from 'is-hotkey';
import ContentWrapper from 'components/ContentWrapper';

const isInsert = isHotkey('mod+i');
const isEdit = isHotkey('mod+e');

class WikiPage extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEdit);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEdit);
  }

  handleEdit = e => {
    if (isEdit(e) || isInsert(e)) {
      this.props.onEdit();
    }
  };

  render() {
    const { onEdit, content } = this.props;
    return (
      <ContentWrapper>
        <Markdown>{content}</Markdown>
      </ContentWrapper>
    );
  }
}

export default withWikiPage(WikiPage);
