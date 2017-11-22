import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import Prism from 'prismjs';
import Markdown from 'components/Markdown';
import ContentWrapper from 'components/ContentWrapper';
import { Flex, Box } from 'reflexbox';

const plugins = [];

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Plain.deserialize(props.initialValue),
      raw: props.initialValue,
      preview: false,
    };
  }

  onChange = ({ value }) => {
    const raw = Plain.serialize(value);
    this.setState({ value, raw });
  };

  onKeyDown = (event, change) => {
    if (!event.metaKey) return;

    switch (event.key) {
      case 'p': {
        event.preventDefault();
        // Enter preview mode
        this.setState({ preview: !this.state.preview });
        break;
      }
      case 's': {
        event.preventDefault();
        // Save our page
        alert('Save TODO');
      }
    }
  };

  renderMark = props => {
    const { children, mark } = props;
    switch (mark.type) {
      case 'url':
        return (
          <a href="" style={{ color: 'pink' }}>
            {children}
          </a>
        );
      case 'bold':
        return <strong>{children}</strong>;
      case 'code':
        return <code>{children}</code>;
      case 'italic':
        return <em>{children}</em>;
      case 'underlined':
        return <u>{children}</u>;
      case 'title': {
        return (
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
              margin: '20px 0 10px 0',
              display: 'inline-block',
            }}>
            {children}
          </span>
        );
      }
      case 'punctuation': {
        return <span style={{ opacity: 0.2 }}>{children}</span>;
      }
      case 'list': {
        return (
          <span
            style={{
              paddingLeft: '10px',
              lineHeight: '10px',
              fontSize: '20px',
            }}>
            {children}
          </span>
        );
      }
      case 'hr': {
        return (
          <span
            style={{
              borderBottom: '2px solid #000',
              display: 'block',
              opacity: 0.2,
            }}>
            {children}
          </span>
        );
      }
    }
  };

  decorateNode(node) {
    if (node.kind != 'block') return;

    const string = node.text;
    const texts = node.getTexts().toArray();
    const grammar = Prism.languages.markdown;
    const tokens = Prism.tokenize(string, grammar);
    const decorations = [];
    let startText = texts.shift();
    let endText = startText;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;

    function getLength(token) {
      if (typeof token == 'string') {
        return token.length;
      } else if (typeof token.content == 'string') {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    }

    for (const token of tokens) {
      startText = endText;
      startOffset = endOffset;

      const length = getLength(token);
      const end = start + length;

      let available = startText.text.length - startOffset;
      let remaining = length;

      endOffset = startOffset + remaining;

      while (available < remaining) {
        endText = texts.shift();
        remaining = length - available;
        available = endText.text.length;
        endOffset = remaining;
      }

      if (typeof token != 'string') {
        const range = {
          anchorKey: startText.key,
          anchorOffset: startOffset,
          focusKey: endText.key,
          focusOffset: endOffset,
          marks: [{ type: token.type }],
        };

        decorations.push(range);
      }

      start = end;
    }

    return decorations;
  }

  render() {
    const { value, raw, preview } = this.state;

    return (
      <Flex column>
        <Flex w={preview ? '50%' : '100%'}>
          <ContentWrapper>
            <SlateEditor
              style={{
                margin: '0 auto',
                minWidth: preview ? '90%' : '60%',
              }}
              onKeyDown={this.onKeyDown}
              value={value}
              onChange={this.onChange}
              plugins={plugins}
              renderMark={this.renderMark}
              decorateNode={this.decorateNode}
              autoFocus
              spellCheck
            />
          </ContentWrapper>
        </Flex>

        {preview && (
          <Flex w="50%">
            <ContentWrapper>
              <Markdown>{raw}</Markdown>
            </ContentWrapper>
          </Flex>
        )}
      </Flex>
    );
  }
}

(Prism.languages.markdown = Prism.languages.extend('markup', {})),
  Prism.languages.insertBefore('markdown', 'prolog', {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
    code: [
      { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
      { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
    ],
    title: [
      {
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: 'important',
        inside: { punctuation: /==+$|--+$/ },
      },
      {
        pattern: /(^\s*)#+.+/m,
        lookbehind: !0,
        alias: 'important',
        inside: { punctuation: /^#+|#+$/ },
      },
    ],
    hr: {
      pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: 'punctuation',
    },
    list: {
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: 'punctuation',
    },
    'url-reference': {
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: 'url',
    },
    bold: {
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^[*_]|[*_]$/ },
    },
    url: {
      pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
      },
    },
  }),
  (Prism.languages.markdown.bold.inside.url = Prism.util.clone(
    Prism.languages.markdown.url,
  )),
  (Prism.languages.markdown.italic.inside.url = Prism.util.clone(
    Prism.languages.markdown.url,
  )),
  (Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
    Prism.languages.markdown.italic,
  )),
  (Prism.languages.markdown.italic.inside.bold = Prism.util.clone(
    Prism.languages.markdown.bold,
  ));

export default Editor;
