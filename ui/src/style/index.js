export const colors = {
  gray1: '#1C2022',
  gray2: '#696969',
};

export const baseIcon = `
  color: ${colors.gray1};

  &:hover {
    cursor: pointer;
    color: ${colors.gray2};
  }
`;

export const strokeIcon = `
  stroke: ${colors.gray1};

  &:hover {
    cursor: pointer;
    stroke: ${colors.gray2};
  }
`;

export default {
  colors,
};
