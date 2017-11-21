import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import { Flex, Box } from 'reflexbox';
import { withRouter } from 'react-router-dom';
import * as Api from 'util/api';

const style = {
  width: '100%',
};

class WikiPage extends Component {
  state = { content: '' };

  componentDidMount() {
    const { history, match: { params: { page } } } = this.props;

    Api.view(page)
      .then(({ data, status }) => {
        if (status === 404) {
          history.push(`/wiki/new/${page}`);
        } else {
          this.setState({ content: data.body });
        }
      })
      .catch(() => {
        history.push(`/wiki/new/${page}`);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { history, match: { params: { page } } } = this.props;

    if (page !== nextProps.match.params.page) {
      Api.view(nextProps.match.params.page)
        .then(({ data }) => this.setState({ content: data.body }))
        .catch(() => {
          history.push(`/wiki/new/${page}`);
        });
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

export default withRouter(WikiPage);
