import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

interface ColProps {
  span: number,
  gutter?: number,
}

const ColStyle = styled.div`
  width: ${(props: ColProps) => props.span === 0 ? '100%' : 100 / props.span + '%'};
  padding: 0 ${(props: ColProps) => props.gutter === 0 ? 'auto' : props.gutter! / 2 + 'px'};
`

class Col extends Component<ColProps> {
  static propTypes = {
    span: PropTypes.number,
    gutter: PropTypes.number,
  }

  static defaultProps = {
    gutter: 0,
  };

  render() {
    const { children, ...rest } = this.props;

    return <ColStyle {...rest}>{children}</ColStyle>
  }
}

export default Col;
