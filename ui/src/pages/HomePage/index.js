import React, { Component } from 'react';
import * as Api from 'util/api';
import { withRouter } from 'react-router';
import DefaultHome from 'components/DefaultHome';
import ContentWrapper from 'components/ContentWrapper';

class HomePage extends Component {
  state = { loading: true };

  componentDidMount() {
    const { history } = this.props;
    Api.view('home.md')
      .then(({ status, data }) => {
        if (status === 200) {
          history.push(`/wiki/home`);
        }
        this.setState({ loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, data } = this.state;
    if (loading) return null;

    return (
      <ContentWrapper>
        <DefaultHome />
      </ContentWrapper>
    );
  }
}

export default withRouter(HomePage);
