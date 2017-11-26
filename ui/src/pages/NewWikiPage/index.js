import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ContentWrapper from 'components/ContentWrapper';
import Editor from 'components/Editor';
import { actions } from 'store/modules/pages';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

class NewWikiPage extends Component {
  static propTypes = {
    savePage: PropTypes.func.isRequired,
    viewPage: PropTypes.func.isRequired,
  };

  handleSave = newContent => {
    const { savePage, match: { params: { page } } } = this.props;
    savePage(page, newContent);
  };

  handleView = () => {
    const { viewPage, match: { params: { page } } } = this.props;
    viewPage(page);
  };

  render() {
    return (
      <ContentWrapper>
        <h1>Create New Page</h1>
        <Editor
          initialValue="# Add content and save your new page"
          onSave={this.handleSave}
          onView={this.handleView}
        />
      </ContentWrapper>
    );
  }
}

const withCache = connect(undefined, actions);
const enhance = compose(withRouter, withCache);

export default enhance(NewWikiPage);
