import React, { Component } from 'react';
import Markdown from 'components/Markdown';
import { Flex, Box } from 'reflexbox';
import withWikiPage from 'util/withWikiPage';

const style = {
  width: '100%',
};

class WikiPage extends Component {
  render() {
    const { onEdit, content } = this.props;
    return (
      <Flex column m="auto" w={[3 / 4, 3 / 4, 3 / 4, 3 / 4]}>
        <Box>
          <button onClick={onEdit}>edit</button>
        </Box>
        <div>
          <Markdown>{content}</Markdown>
        </div>
      </Flex>
    );
  }
}

export default withWikiPage(WikiPage);
