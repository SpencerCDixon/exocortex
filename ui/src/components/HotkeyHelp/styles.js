import styled from 'styled-components';
import { colors } from 'style';

export const Circle = styled.div`
  background: ${colors.gray1};
  border-radius: 100px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
  transition: box-shadow 80ms ease-in-out;
  z-index: 10000;
  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09), 0 4px 40px rgba(0, 0, 0, 0.24);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

export const Helper = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09), 0 4px 40px rgba(0, 0, 0, 0.24);
  min-width: 200px;
  min-height: 200px;
  margin-bottom: 20px;
  padding: 15px;
  transition: all 0.2s ease-in-out;
  transform: ${p => (p.open ? 'scale(1)' : 'scale(0.8)')};
  opacity: ${p => (p.open ? 1 : 0)};
`;

export const Hotkey = styled.div`
  background: rgb(238, 238, 238);
  border-radius: 2px;
  margin-right: 8px;
  padding: 2px 7px;
  text-transform: uppercase;
  font-weight: bold;
  width: 45px;
  text-align: left;
`;

export const Subheader = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 15px;
`;
