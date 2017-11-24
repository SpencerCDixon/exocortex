import React, { PropTypes } from 'react';
import { pageDirectory, isExternalURL } from 'util/path';
import { resolve } from 'path';
import { withRouter } from 'react-router-dom';

function WikiImage({
  src,
  history, // don't want to spread these down
  location, // don't want to spread these down
  match: { params: { page } },
  staticContext,
  ...rest
}) {
  let resolvedSrc;
  if (isExternalURL(src)) {
    resolvedSrc = src;
  } else {
    const pageDir = pageDirectory(page);
    const resolved = resolve(pageDir, src);
    resolvedSrc = `/api/images${resolved}`;
  }

  return <img src={resolvedSrc} {...rest} />;
}

export default withRouter(WikiImage);
