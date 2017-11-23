import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ContentWrapper from 'components/ContentWrapper';
import * as Api from 'util/api';
import Editor from 'components/Editor';

class NewWikiPage extends Component {
  handleSave = newContent => {
    const { history, match: { params: { page } } } = this.props;
    Api.save(page, newContent).then(() => {
      history.push(`/wiki/${page}`);
    });
  };
  handleView = () => {
    const { history, match: { params: { page } } } = this.props;
    history.push(`/wiki/${page}`);
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

export default withRouter(NewWikiPage);
