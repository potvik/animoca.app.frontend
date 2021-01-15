import React from "react";
import { Box } from "grommet";
import { Icon, Loader, Text, Title } from "../Base";
import { Form, Input, isEmail, isRequired } from "../Form";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { WALLET_TYPE } from "stores/UserStore";
import * as styles from "./styles.styl";
import cn from "classnames";
import { IStores } from "stores";
import { AuthWarning } from "../AuthWarning";
import MobileDetect from "mobile-detect";
import { EXPLORER_URL } from "../../blockchain";
import { truncateAddressString } from "../../utils";

const md = new MobileDetect(window.navigator.userAgent);

const icon = status =>  <Icon size="50" style={{width: 50}} glyph={status === 'CONFIRMED' ? 'CheckMark' : 'Alert'} />;


@inject("user", "tokenList")
@observer
export class PlayerIDModal extends React.Component<IStores & any> {
  formRef: any;
  state = {
    isLoading: false,
    tx: null // { result: { error: null, txStatus: 'CONFIRMED', id: "0x87a740233239a0e46776c59e26caef430797ff5373859e74336e014564fe8033" } } };
  }

  @observable formData = {
    playerID: ""
  };

  componentDidMount = () => {


    this.props.onValidate.callback = () => {
      return this.formRef
        .validateFields()
        .then(data => ({ ...data }))
        .then(async (data) => {
          this.setState({ isLoading: true });
          const res = await this.props.tokenList.claimCards(data.playerID);
          this.setState({ isLoading: false });
          this.setState({ tx: res });
          console.log({ res });
          await new Promise((r) => setTimeout(r, 4000));
          this.setState({ tx: null });
        });
    };
  };

  render() {


    if (this.state.tx) {
      console.log(this.state.tx);
      //@ts-ignore
      return <Box pad={{ horizontal: "large", top: "large" }} style={{ top: "100px" }}>

        <div style={{ textAlign: "center" }}>
          {icon(this.state.tx.result.txStatus)}

          <Box className={styles.description}>
          <Text>{this.state.tx.result.txStatus === 'CONFIRMED' ? 'success' : this.state.tx.result.error}</Text>
          <a
            style={{ marginTop: 10, color: "black" }}
            href={EXPLORER_URL + `/tx/${this.state.tx.result.id}`}
            target="_blank"
          >
            Tx id: {truncateAddressString(this.state.tx.result.id)}
          </a>
          </Box>
        </div>
      </Box>;
    }

    return (
      <Box pad={{ horizontal: "large", top: "large" }} style={{ top: "100px" }}>
        <Text style={{ textAlign: "center" }}>Enter your BeastQuest player ID to receive the gems and VIP points in the
          game</Text>
        {/*@ts-ignore*/
          this.state.isLoading && <Loader label="Processing..." />
        }
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
