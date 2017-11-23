import React from 'react';
import Markdown from 'components/Markdown';
import styled from 'styled-components';

const Td = styled.td`
  text-align: ${p => (p.align ? p.align : 'center')};
`;

const CommandRow = ({ cmd, desc }) => (
  <tr>
    <Td>
      <kbd>{cmd}</kbd>
    </Td>
    <Td align="left">{desc}</Td>
  </tr>
);

function DefaultHome() {
  return (
    <div>
      <Markdown>
        {`
# Welcome To Exocortex

A modern wiki that acts an extension of your brain.

## Getting Started

You're seeing this page it's because you don't currently have a homepage (home.md) set up. 
Feel free to [click this link to create a custom home page](./home.md).  

## Hot keys

There are a number of hot keys to make editing and viewing pages a better experience.  You can find those hot keys by clicking the '?' on the bottom left. Here is a brief overview:  
`}
      </Markdown>

      <p>
        <strong>Note:</strong> <kbd>mod</kbd> key is <kbd>command</kbd> on Mac
        and <kbd>control</kbd> on windows.
      </p>

      <table>
        <CommandRow cmd="mod + ?" desc="Toggle help" />
        <CommandRow cmd="mod + p" desc="Preview mode" />
        <CommandRow cmd="mod + (i|e)" desc="Edit/Insert mode" />
        <CommandRow cmd="mod + z" desc="Zen mode" />
      </table>
    </div>
  );
}

export default DefaultHome;
