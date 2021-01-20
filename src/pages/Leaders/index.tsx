import * as React from "react";
import { Box } from "grommet";
import { Loader, Button, Title } from "components/Base";
import { BaseContainer, PageContainer } from "components";
import { useStores } from "stores";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { SignIn } from "../../components/SignIn";
import { PlayerIDModal } from "../../components/PlayerIDModal";
import { ClaimTransactionModal } from "../../components/ClaimTransactionModal";
import { Table, TableCell, TableRow, TableBody, TableHeader } from "grommet";
import { useMediaQuery } from "react-responsive";
// import { PLAYERS_FILTER } from '../../stores/SoccerPlayersList';
const leadersUrl = 'https://explorer.hmny.io:8888/animoca-list'
export const Leaders = observer(() => {
  const { tokenList, user, actionModals, routing } = useStores();

  const [isPlayerIDModalOpen, setPlayerIDModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [claimTxDetails, setClaimTxDetails] = React.useState(null);
  const [list, setList] = React.useState([]);

  useEffect( () => {
    if (list.length) {
      return
    }

    window.fetch(leadersUrl)
      .then(r=>r.text())
      .then(r=>{
        const lines = r.split('\n')
        const res = []
        lines.forEach(l => {
          const records = l.split(',')
          if (isNaN(+records[0])) {
            return
          }
          res.push({address: records[1], playerID: records[2],
          sets: records[6]
          })
        })
      console.log(res)

        setList(res)
    })

  }, [list]);

  const isSmallMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <BaseContainer>
      <Box style={
        {
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "20px",
          margin: "0 auto",
          width: "640px",
          marginBottom: "40px"
        }
      }>
        <Box
          direction="row"
          align="center"
          justify="center"
          style={{ color: "black", fontWeight: "bold" }}
        >
          <Title>Leaders</Title>
        </Box>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom" size="xxsmall">
                #
              </TableCell>
              <TableCell scope="col" border="bottom">
                Address
              </TableCell>
              <TableCell scope="col" border="bottom" size="xxsmall">
                Sets
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>

            {list
              .filter(e => e.sets > 0)
              .map((e,i) => {
              return <TableRow key={i}>
                <TableCell scope="row" >
                  <strong>{i+1}</strong>
                </TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>{e.sets}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>


      </Box>


    </BaseContainer>
  );
});
