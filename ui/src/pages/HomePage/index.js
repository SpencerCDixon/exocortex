import React, { Component } from 'react';
import * as Api from 'util/api';
import { Box, Flex } from 'reflexbox';
import WikiLink from 'components/WikiLink';

class HomePage extends Component {
  state = { data: [] };

  componentDidMount() {
    Api.list().then(({ data }) => {
      this.setState({ data: data.prefixes });
    });
  }

  render() {
    return (
      <Flex column m="auto" w={[3 / 4, 3 / 4, 3 / 4, 3 / 4]}>
        {this.state.data.map(link => (
          <Box key={link} my={2}>
            <WikiLink href={link}>{link}</WikiLink>
          </Box>
        ))}
      </Flex>
    );
  }
}

export default HomePage;
