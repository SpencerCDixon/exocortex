import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIsZen } from 'store/modules/modes';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

export default function hideWhenZen(BaseComponent) {
  class HiddenZen extends Component {
    static propTypes = {
      isZen: PropTypes.bool.isRequired,
    };

    render() {
      const { isZen, ...rest } = this.props;
      if (isZen) return null;
      return <BaseComponent {...rest} />;
    }
  }

  return connect(
    createStructuredSelector({
      isZen: getIsZen,
    }),
  )(HiddenZen);
}
