import React from "react";
import { Box } from "grommet";
import { Text, Title } from "../Base";
import { Form, Input, isEmail, isRequired } from "../Form";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { WALLET_TYPE } from "stores/UserStore";
import * as styles from "./styles.styl";
import cn from "classnames";
import { IStores } from "stores";
import { AuthWarning } from "../AuthWarning";
import MobileDetect from "mobile-detect";

const md = new MobileDetect(window.navigator.userAgent);

@inject("user")
@observer
export class PlayerIDModal extends React.Component<IStores & any> {
  formRef: any;

  @observable formData = {
    playerID: ""
  };

  componentDidMount = () => {


    this.props.onValidate.callback = () => {
      return this.formRef
        .validateFields()
        .then(data => ({ ...data }));
    };
  };

  render() {
    return (
      <Box pad={{ horizontal: "large", top: "large" }} style={{ top: "100px" }}>
        <Text style={{textAlign:"center"}}>Enter your BeastQuest player ID to receive the gems and VIP points in the game</Text>
        <Form
          ref={ref => (this.formRef = ref)}
          data={this.formData}
          {...({} as any)}
        >
          <Box
            pad={{ horizontal: "large", vertical: "xsmall" }}
          >
            <Input
              name="playerID"
              label=""
              style={{ width: "361px", maxWidth: "100%" }}
              placeholder="Player ID"
              rules={[isRequired]}
            />
          </Box>
        </Form>

      </Box>
    );
  }
}
