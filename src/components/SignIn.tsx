import React from 'react';
import { Box } from 'grommet';
import { Title, Text } from './Base';
import { Form, Input, isEmail, isRequired } from './Form';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export class SignIn extends React.Component<any> {
  formRef: any;
  @observable formData = {
    email: '',
  };

  // onValidate = () => {
  //   return this.formRef.onValidate();
  // };

  componentDidMount = () => {
    this.props.onValidate.callback = () => this.formRef.validateFields();
  };

  render() {
    return (
      <Box pad={{ horizontal: 'large', top: 'large' }}>
        <Title>Sign in</Title>
        <Form
          ref={ref => (this.formRef = ref)}
          data={this.formData}
          {...({} as any)}
        >
          <Box margin={{ vertical: 'large' }}>
            <Input
              name="email"
              label="Your email"
              style={{ width: '361px' }}
              placeholder="email@gmail.com"
              rules={[isRequired, isEmail]}
            />
          </Box>
        </Form>
      </Box>
    );
  }
}
