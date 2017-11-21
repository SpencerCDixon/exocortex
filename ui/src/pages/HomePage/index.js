import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Api from 'util/api';
import { Box, Flex } from 'reflexbox';

class HomePage extends Component {
  state = { data: [] };

  componentDidMount() {
    Api.list()
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.prefixes });
      });
  }

  render() {
    return (
      <Flex column m="auto" w={[3 / 4, 3 / 4, 3 / 4, 3 / 4]}>
        {this.state.data.map(link => (
          <Box my={2}>
            <Link key={link} to={`/wiki/${link}`}>
              {link}
            </Link>
          </Box>
        ))}
      </Flex>
    );
  }
}

export default HomePage;
