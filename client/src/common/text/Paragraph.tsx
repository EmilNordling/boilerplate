import React from 'react';
import styled from 'styled-components';

const ParagraphStyle = styled.div`
  color: inherit;
  font-size: 1.6rem;
`;

const Paragraph: React.SFC = ({ children, ...rest }) => (
  <ParagraphStyle {...rest}>{children}</ParagraphStyle>
);

export default Paragraph;
