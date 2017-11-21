import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import { Flex, Box } from 'reflexbox';
import * as Api from 'util/api';

const style = {
  width: '100%',
};

class WikiPage extends Component {
  state = { content: '' };

  componentDidMount() {
    Api.view(this.props.match.params.page)
      .then(res => res.json())
      .then(data => this.setState({ content: data.body }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      Api.view(nextProps.match.params.page)
        .then(res => res.json())
        .then(data => this.setState({ content: data.body }));
    }
  }

  render() {
    return (
      <Flex column m="auto" w={[3 / 4, 3 / 4, 3 / 4, 3 / 4]}>
        <div>
          <Markdown>{this.state.content}</Markdown>
        </div>
      </Flex>
    );
  }
}

export default WikiPage;
