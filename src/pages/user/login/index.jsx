import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { md5Hash } from '../../../utils/utils';
import LoginComponents from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  captcha: login.captcha,
}))
class Login extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/loadCaptcha',
    });
  }
  loginForm = undefined;
  state = {
    // type: 'account',
    autoLogin: true,
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  handleSubmit = (err, values) => {
    // const { type } = this.state;

    if (!err) {
      const { dispatch, userLogin } = this.props;
      console.log(userLogin.captchaID)
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          captcha_id: userLogin.captchaID,
          password: md5Hash(values.password),
        },
      });
    }
  };

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting, captcha } = this.props;
    const { status } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
            {status === 'error' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-credentials',
                }),
              )}
            <UserName
              name="user_name"
              placeholder={`${formatMessage({
                id: 'user-login.login.userName',
              })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.userName.required',
                  }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({
                id: 'user-login.login.password',
              })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.password.required',
                  }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
            <Captcha
              name="captcha_code"
              placeholder={formatMessage({
                id: 'user-login.verification-code.placeholder',
              })}
              alt="Verification code"
              getCaptchaImage = {captcha}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.verification-code.required',
                  }),
                },
              ]}
            />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="user-login.login.sign-in-with" />
            <Icon type="twitter" className={styles.icon} theme="outlined" />
            <Icon type="google" className={styles.icon} theme="outlined" />
            <Icon type="github" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="user-login.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
