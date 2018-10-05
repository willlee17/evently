import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { connect } from 'react-redux';
import { loginUser, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const mapDispatchToProps = {
  loginUser,
  socialLogin,
}

const LoginForm = ({loginUser, handleSubmit, error, socialLogin}) => { //handleSubmit is from redux form
  return (
    <Form size="large" onSubmit={handleSubmit(loginUser)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label basic color="red">{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal> Or </Divider>
        <SocialLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  );
};

export default connect(null, mapDispatchToProps)(reduxForm({form: "loginForm"})(LoginForm))
