import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { AuthStore, GuiStore } from '../stores';
import routes from '../routes';
import WithGlobalStyles from '../hoc/WithGlobalStyles';
import { H } from '../common/text';
import { colors } from '../constants';

const SWUpdate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background: ${colors.main_color_highlight};
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`;

@inject('authStore', 'guiStore')
@observer
class App extends Component<{ authStore: AuthStore, guiStore: GuiStore }> {
  componentDidMount() {
    this.props.authStore.pullUser();
  }

  render () {
    const { authenticated, currentUser } = this.props.authStore;

    return (
      <Router>
        <Fragment>
          <Helmet
            titleTemplate='boilerplate - %s'
            defaultTitle='boilerplate'
          />
          {this.props.guiStore.showSWUpdated &&
            <SWUpdate onClick={() => window.location.reload()}>
              <H size={3}>There's a new version available. Click here to update</H>
            </SWUpdate>
          }
          <Switch>
            {routes.map(pages => <Route {...pages} />)}
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default WithGlobalStyles(App);
