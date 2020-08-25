import React from 'react';
import { Box } from 'grommet';
import { Text, Title } from '../Base';
import { Form, Input, isEmail, isRequired } from '../Form';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { WALLET_TYPE } from 'stores/UserStore';
import * as styles from './styles.styl';
import cn from 'classnames';
import { IStores } from 'stores';
import { AuthWarning } from '../AuthWarning';

@inject('user')
@observer
export class SignIn extends React.Component<IStores & any> {
  formRef: any;

  @observable formData = {
    email: '',
  };

  @observable walletType: WALLET_TYPE;

  // onValidate = () => {
  //   return this.formRef.onValidate();
  // };

  componentDidMount = () => {
    this.props.onValidate.callback = () => {
      if (this.walletType === WALLET_TYPE.MAGIC_WALLET) {
        return this.formRef
          .validateFields()
          .then(data => ({ ...data, walletType: this.walletType }));
      } else {
        return Promise.resolve({ walletType: this.walletType });
      }
    };
  };

  render() {
    const { user } = this.props;

    return (
      <Box pad={{ horizontal: 'large', top: 'large' }}>
        <Box direction="column">
          <Title style={{ textAlign: 'center', marginBottom: 10 }}>
            Choose your wallet
          </Title>

          <Box
            className={cn(
              styles.walletItem,
              this.walletType === WALLET_TYPE.ONE_WALLET ? styles.selected : '',
            )}
            onClick={() => (this.walletType = WALLET_TYPE.ONE_WALLET)}
          >
            <img
              src="/one.svg"
              style={{ marginRight: 10, marginBottom: 3, height: 26 }}
            />
            ONE Wallet
          </Box>
          <Box
            className={cn(
              styles.walletItem,
              this.walletType === WALLET_TYPE.MAGIC_WALLET
                ? styles.selected
                : '',
            )}
            onClick={() => (this.walletType = WALLET_TYPE.MAGIC_WALLET)}
          >
            <img src="/magic.svg" style={{ height: 40 }} />
          </Box>
        </Box>

        {this.walletType === WALLET_TYPE.MAGIC_WALLET ? (
          <Box direction="column">
            <Form
              ref={ref => (this.formRef = ref)}
              data={this.formData}
              {...({} as any)}
            >
              <Box
                style={{ borderLeft: '1px solid #dedede' }}
                margin={{ vertical: 'xsmall' }}
                pad={{ horizontal: 'large', vertical: 'xsmall' }}
              >
                <Title>Use Magic Wallet</Title>
                <Box margin={{ bottom: 'xsmall', top: 'small' }}>
                  <Text>Email: </Text>
                </Box>
                <Input
                  name="email"
                  label=""
                  style={{ width: '361px' }}
                  placeholder="email@gmail.com"
                  rules={[isRequired, isEmail]}
                />
              </Box>
            </Form>
          </Box>
        ) : null}

        {this.walletType === WALLET_TYPE.ONE_WALLET ? (
          <Box
            style={{ borderLeft: '1px solid #dedede' }}
            margin={{ vertical: 'xsmall' }}
            pad={{ horizontal: 'large', vertical: 'xsmall' }}
          >
            <Title>Use ONE Wallet Browser Extension</Title>
            {!user.isOneWallet ? <AuthWarning /> : null}
          </Box>
        ) : null}
      </Box>
    );
  }
}
