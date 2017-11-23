import React, { Component } from 'react';
import ContentWrapper from 'components/ContentWrapper';
import * as Api from 'util/api';
import { Flex, Box } from 'reflexbox';
import WikiLink from 'components/WikiLink';

class SearchPage extends Component {
  state = { results: [], loading: true };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const value = params.get('query');
    this.search(value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search != nextProps.location.search) {
      const params = new URLSearchParams(nextProps.location.search);
      const value = params.get('query');
      this.search(value);
    }
  }

  search = value => {
    Api.search(value)
      .then(({ data }) => {
        this.setState({ loading: false, results: data.results });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <ContentWrapper>
        <h1>Search Results</h1>
        <Flex column>
          {this.state.results.map(r => (
            <Box my={2}>
              <WikiLink href={r.page}>{r.page}</WikiLink> - {r.content}
            </Box>
          ))}
        </Flex>
      </ContentWrapper>
    );
  }
}

export default SearchPage;
