import React, { Component, Fragment } from 'react';
import Nav from './Nav';
import Helmet, { HelmetProps } from 'react-helmet';
import styled from 'styled-components';
import { colors, media } from '../constants';
import { P } from '../common/text';
import { inject, observer } from 'mobx-react';
import { AuthStore, authStore } from '../stores';

interface PageProps extends HelmetProps {
  showHeader?: boolean,
  authStore?: AuthStore,
}

const Inner = styled.section`
  flex: 1;
  padding: 20px;
  background: ${colors.main_background_dark};
  color: #ffffff;

  ${media.small`
    padding: 10px;
  `}
`

@inject('authStore')
@observer
class Page extends Component<PageProps> {
  static defaultProps: PageProps = {
    showHeader: true,
  };

  render () {
    const { authenticated, currentUser } = this.props.authStore!;
    const { children, showHeader, ...rest } = this.props;

    return (
      <Fragment>
        <Helmet {...rest} />
        { showHeader &&
          <Nav />
        }
        <Inner>
          {(authenticated && currentUser === null) ? <P>Loading</P> : children}
        </Inner>
      </Fragment>
    )
  }
}

export default Page;
