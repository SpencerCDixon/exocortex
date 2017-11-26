import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getIsEditing,
  getIsViewing,
  getCurrentPage,
  actions,
} from 'store/modules/pages';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

export default function withWikiPage(BaseComponent) {
  class WithWikiPage extends Component {
    state = { content: null };

    static propTypes = {
      match: PropTypes.object,
      currentPage: PropTypes.string,
      viewPage: PropTypes.func.isRequired,
      savePage: PropTypes.func.isRequired,
      editPage: PropTypes.func.isRequired,
      deletePage: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { isEditing, viewPage, match: { params: { page } } } = this.props;
      if (!isEditing) {
        viewPage(page);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { isEditing, viewPage, match: { params: { page } } } = this.props;

      if (page !== nextProps.match.params.page) {
        viewPage(nextProps.match.params.page);
      }
    }

    handleSave = newContent => {
      const { savePage, match: { params: { page } } } = this.props;
      savePage(page, newContent);
    };

    handleEdit = () => {
      const { editPage, match: { params: { page } } } = this.props;
      editPage(page);
    };

    handleView = () => {
      const { viewPage, match: { params: { page } } } = this.props;
      viewPage(page);
    };

    handleDelete = () => {
      const { deletePage, match: { params: { page } } } = this.props;
      deletePage(page);
    };

    render() {
      const { currentPage, match: { params: { page } } } = this.props;

      if (currentPage) {
        return (
          <BaseComponent
            page={page}
            content={currentPage}
            onEdit={this.handleEdit}
            onSave={this.handleSave}
            onView={this.handleView}
            onDelete={this.handleDelete}
            {...this.props}
          />
        );
      }

      // TODO: have a real spinner..
      return null;
    }
  }
  const withCache = connect(
    createStructuredSelector({
      currentPage: getCurrentPage,
      isEditing: getIsEditing,
      isViewing: getIsViewing,
    }),
    actions,
  );
  const enhance = compose(withRouter, withCache);
  return enhance(WithWikiPage);
}
