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
import { truncateAddressString } from "../../utils";
import { Loader, Button } from "components/Base";

const md = new MobileDetect(window.navigator.userAgent);

@inject("user")
@observer
export class ClaimTransactionModal extends React.Component<IStores & any> {
  formRef: any;
  isLoading: boolean = false;

  @observable formData = {
    playerID: ""
  };

  componentDidMount = () => {

  };

  render() {
    const {initData} = this.props

    if (this.isLoading) {
      //@ts-ignore
      return <Loader label="Processing..."/>
    }
    return (
      <Box pad={{ horizontal: "large", top: "large" }} style={{ top: "100px" }}>
        {JSON.stringify(initData)}
        Tx id: {truncateAddressString(initData.txId)}
      </Box>
    );
  }
}
