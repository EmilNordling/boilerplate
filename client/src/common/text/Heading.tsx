import React from 'react';
import styled, { css } from 'styled-components';

const sizes = [
  3.2,
  2.4,
  1.9,
];

interface HeadingProps {
  size: 1 | 2 | 3;
  margin?: boolean;
}

const HeadingStyle = styled.div`
  color: inherit;
  font-size: ${(props: HeadingProps) => sizes[props.size - 1]}rem;
  text-align: center;

  ${(props: HeadingProps) => props.margin && css`
    margin-bottom: 20px;
  `};
`;

const Heading: React.SFC<HeadingProps> = ({ children, ...rest }) => (
  <HeadingStyle {...rest}>{children}</HeadingStyle>
);

export default Heading;
