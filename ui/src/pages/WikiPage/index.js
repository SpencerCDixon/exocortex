import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import { Flex, Box } from 'reflexbox';
import * as Api from 'util/api';

class WikiPage extends Component {
  state = { content: '' };

  componentDidMount() {
    Api.view(this.props.match.params.page)
      .then(res => res.json())
      .then(data => this.setState({ content: data.body }));
  }

  render() {
    return (
      <Flex m="auto" w={[3 / 4, 3 / 4, 3 / 4, 3 / 4]}>
        <Markdown>{this.state.content}</Markdown>
      </Flex>
    );
  }
}

export default WikiPage;
