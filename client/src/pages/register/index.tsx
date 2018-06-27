import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import Page from '../../components/Page';
import { Form, Fieldset, FieldsetItem, Button } from '../../common/field';
import { H } from '../../common/text';
import NavRow from '../../components/NavRow';

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5%;
`;

@inject('authStore')
@observer
class Register extends Component<{ authStore?: AuthStore }> {
  public state = this.defaultState;
  private get defaultState() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  public componentWillMount() {
    this.setState(this.defaultState);
  }

  public componentWillUnmount() {
    this.setState(this.defaultState);
  }

  private handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({ username: event.currentTarget.value });
  private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({ email: event.currentTarget.value });
  private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({ password: event.currentTarget.value });
  private handlepasswordConfirmChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({ passwordConfirm: event.currentTarget.value });
  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.authStore!.register(this.state, () => {
      this.props.history.replace('/');
    });
  }

  render() {
    const { username, email, password, passwordConfirm } = this.state;
    const { loading } = this.props.authStore!;

    return (
      <Page showHeader={false} title='Register! 🚀'>
        <Content>
          <Form onSubmit={this.handleSubmitForm}>
            <H size={3} margin={true}>Register! 🚀</H>
            <Fieldset>
              <FieldsetItem
                label='username'
                type='text'
                value={username}
                onChange={this.handleUsernameChange}
              />
              <FieldsetItem
                label='email'
                type='Email'
                value={email}
                onChange={this.handleEmailChange}
              />
              <FieldsetItem
                label='password'
                type='Password'
                value={password}
                onChange={this.handlePasswordChange}
              />
              <FieldsetItem
                label='repeat password'
                type='Password'
                value={passwordConfirm}
                onChange={this.handlepasswordConfirmChange}
              />
            </Fieldset>

            <Button type='submit' disabled={loading}>
              create
            </Button>

            <NavRow
              links={[
                {
                  linkTo: '/',
                  value: 'home',
                },
                {
                  linkTo: '/signin',
                  value: 'sign in',
                },
              ]}
            />
          </Form>
        </Content>
      </Page>
    );
  }
}

export default Register;
