import React, { Component } from 'react';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRenderer from 'remark-react';
import RemarkLowlight from 'remark-react-lowlight';

import githubSchema from 'hast-util-sanitize/lib/github.json';

// TODO: maybe just load all of the langs?
import js from 'highlight.js/lib/languages/javascript';
import sql from 'highlight.js/lib/languages/sql';
import ruby from 'highlight.js/lib/languages/ruby';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import elm from 'highlight.js/lib/languages/elm';

import 'highlight.js/styles/tomorrow-night.css';

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [...(githubSchema.attributes.code || []), 'className'],
  }),
});

class Markdown extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return remark()
      .use(reactRenderer, {
        sanitize: schema,
        remarkReactComponents: {
          code: RemarkLowlight({
            js,
            sql,
            ruby,
            xml,
            python,
            java,
            css,
            elm,
          }),
        },
      })
      .processSync(this.props.children).contents;
  }
}

export default Markdown;
