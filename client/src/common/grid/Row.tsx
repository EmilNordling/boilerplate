import React, { Component, cloneElement, Children, ReactElement } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Col from './Col';

interface RowProps {
  gutter: number,
}

const RowStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  margin: 0 ${(props: RowProps) => props.gutter === 0 ? 'auto' : '-' + props.gutter / 2 + 'px'} 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export class Row extends Component<RowProps> {
  static propTypes = {
    gutter: PropTypes.number,
  }

  static defaultProps = {
    gutter: 0,
  };

  render() {
    const { children, ...rest } = this.props;
    const cols = Children.map(children, (col: ReactElement<Col['props']>) => {
      if (!col) return null;

      return cloneElement(col, { gutter: this.props.gutter });
    });

    return <RowStyle { ...rest }>{cols}</RowStyle>
  }
}

export default Row;
