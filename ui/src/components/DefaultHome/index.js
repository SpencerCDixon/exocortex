import React from 'react';
import Markdown from 'components/Markdown';
import styled from 'styled-components';

const Td = styled.td`
  text-align: ${p => (p.align ? p.align : 'center')};
`;

const CommandRow = ({ mod, btn, desc }) => (
  <tr>
    <Td>
      <kbd>{mod}</kbd> + <kbd>{btn}</kbd>
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

If you're seeing this page it's because you don't currently have a homepage (readme.md) set up. 
Feel free to [click this link to create a custom homepage](./readme.md).  

A custom homepage is a good place to add links to your most visited sections of your wiki.

## Hot keys

There are a number of hot keys to make editing and viewing pages a better experience.  You can find those hot keys by clicking the '?' on the bottom left. Here is a brief overview:  
`}
      </Markdown>

      <p>
        <strong>Note:</strong> <kbd>mod</kbd> key is <kbd>command</kbd> on Mac
        and <kbd>control</kbd> on windows.
      </p>

      <table>
        <tbody>
          <CommandRow mod="mod" btn="?" desc="Toggle help" />
          <CommandRow mod="mod" btn="p" desc="Preview mode" />
          <CommandRow mod="mod" btn="(i|e)" desc="Edit/Insert mode" />
          <CommandRow mod="mod" btn="z" desc="Zen mode" />
        </tbody>
      </table>
    </div>
  );
}

export default DefaultHome;
