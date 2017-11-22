import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as Api from 'util/api';

export default function withWikiPage(BaseComponent) {
  class WithWikiPage extends Component {
    state = { content: null };

    static propTypes = {
      match: PropTypes.object,
      history: PropTypes.object,
    };

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

    handleEdit = () => {
      const { history, match: { params: { page } } } = this.props;
      const editLoc = `/wiki/edit/${page}`;
      history.push(editLoc);
    };

    render() {
      const { match: { params: { page } } } = this.props;
      if (this.state.content) {
        return (
          <BaseComponent
            page={page}
            content={this.state.content}
            onEdit={this.handleEdit}
            {...this.props}
          />
        );
      }

      // TODO: have a real spinner..
      return <span>Loading...</span>;
    }
  }
  // Wrap in router
  return withRouter(WithWikiPage);
}
