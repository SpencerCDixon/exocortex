import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import { Flex, Box } from 'reflexbox';
import { withRouter } from 'react-router-dom';
import * as Api from 'util/api';

class EditWikiPage extends Component {
  static propTypes = {
    preview: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    preview: true,
  };
  state = { content: '' };

  componentDidMount() {
    const { history, match: { params: { page } } } = this.props;
    console.log({ page });

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
    const { preview } = this.props;

    return (
      <Flex column>
        <h1>Edit</h1>
        <Flex justify="center" align="center">
          <Flex w="50%">
            <textarea
              style={{ height: '100%', width: '100%' }}
              value={this.state.content}
            />
          </Flex>

          <Flex w="50%">
            {preview && <Markdown>{this.state.content}</Markdown>}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default EditWikiPage;
