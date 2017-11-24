import React, { Component } from 'react';
import ContentWrapper from 'components/ContentWrapper';
import * as Api from 'util/api';
import { Box } from 'reflexbox';
import WikiLink from 'components/WikiLink';

class ExplorePage extends Component {
  state = { results: [] };

  componentDidMount() {
    Api.list().then(({ data }) => {
      this.setState({ results: data.prefixes });
    });
  }

  render() {
    return (
      <ContentWrapper>
        <h1>Explore Wiki</h1>
        {this.state.results.map(r => (
          <Box key={r} my={1}>
            <WikiLink href={r}>{r}</WikiLink>
          </Box>
        ))}
      </ContentWrapper>
    );
  }
}

export default ExplorePage;
