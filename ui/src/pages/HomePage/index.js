import React, { Component } from 'react';
import * as Api from 'util/api';
import { withRouter } from 'react-router';
import DefaultHome from 'components/DefaultHome';
import ContentWrapper from 'components/ContentWrapper';

class HomePage extends Component {
  state = { loading: true };

  componentDidMount() {
    const { history } = this.props;
    Api.view('readme.md')
      .then(({ status }) => {
        if (status === 200) {
          history.push(`/wiki/readme`);
        }
        this.setState({ loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    if (loading) return null;

    return (
      <ContentWrapper>
        <DefaultHome />
      </ContentWrapper>
    );
  }
}

export default withRouter(HomePage);
