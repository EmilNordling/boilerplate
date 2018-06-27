import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import Page from '../../components/Page';
import { H } from '../../common/text';

@inject('authStore')
@observer
class Home extends Component<{ authStore: AuthStore}> {
  render() {
    const { authenticated, currentUser } = this.props.authStore;

    return (
      <Page>
        {authenticated && currentUser !== null ?
          <H size={2}>Hello there, {currentUser.username}! 👋</H>
          :
          <H size={2}>There's nothing here 😔</H>
        }
      </Page>
    );
  }
}

export default Home;
