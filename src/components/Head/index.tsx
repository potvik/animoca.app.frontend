import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { BoxProps, Box } from 'grommet';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Routes } from 'constants/routes';
import { Text } from 'grommet';
import { IStyledChildrenProps } from 'interfaces';
import { Icon } from '../Base/components/Icons';
import { useStores } from '../../stores';
import { Button } from '../Base/components/Button';
import { formatWithTwoDecimals, ones } from '../../utils';
import { SignIn } from '../SignIn';
import { Spinner } from '../../ui/Spinner';

export const MainLogo = styled.img`
  width: auto;
  height: 62px;
`;

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme }: IStyledChildrenProps<BoxProps>) => {
    const history = useHistory();
    const { user, actionModals, tokenList } = useStores();
    const { palette, container } = theme;
    const { minWidth, maxWidth } = container;

    console.log(user.status);

    return (
      <Box
        style={{
          // background: palette.StandardWhite,
          background: '#f6f7fb',
          overflow: 'visible',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 100,
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          direction="row"
          align="center"
          justify="between"
          style={{
            minWidth,
            maxWidth,
            margin: '0 auto',
            padding: '0px 30px',
            height: 100,
            minHeight: 100,
            width: '100%',
          }}
        >
          <Box direction="row" align="center">
            <Box
              align="center"
              margin={{ right: 'small' }}
              onClick={() => history.push('/')}
            >
              <MainLogo src="main_logo.png" />
            </Box>
            <Box>
              {/*<Title size="small" color="BlackTxt" bold>*/}
              {/*  Harmony Soccer Players*/}
              {/*</Title>*/}
            </Box>
          </Box>

          <Box direction="row" align="center" gap="30px">
            {/*<Box style={{ flex: '1 1 100%' }} />*/}

            <Button style={{ width: 140 }} onClick={() => history.push('/buy')}>
              Buy
            </Button>

            {user.status !== 'success' ? null : (
              <Button
                onClick={() => history.push('/my-cards')}
                disabled={!user.isAuthorized}
                style={{ width: 140 }}
              >
                Inventory ({tokenList.list.length})
              </Button>
            )}

            {user.status !== 'success' ? (
              <Spinner />
            ) : user.isAuthorized ? (
              <Box direction="row" justify="end" align="center">
                <Box dir="column">
                  <Text color="rgb(164, 168, 171)" size="small">
                    You authorised as: {user.email}
                  </Text>
                  Address: {user.address}
                  <Text size="small">
                    Balance: {formatWithTwoDecimals(ones(user.balance))} ONEs
                  </Text>
                </Box>
                <Box
                  onClick={() => {
                    user.signOut().then(() => {
                      history.push(`/${Routes.login}`);
                    });
                  }}
                  margin={{ left: 'medium' }}
                >
                  <Icon
                    glyph="Logout"
                    size="24px"
                    style={{ opacity: 0.5 }}
                    color="BlackTxt"
                  />
                </Box>
              </Box>
            ) : (
              <Box
                direction="row"
                justify="end"
                align="center"
                style={{ marginRight: 2, marginTop: 2 }}
              >
                <Button
                  style={{ width: 120 }}
                  onClick={() => {
                    actionModals.open(SignIn, {
                      title: 'Sign in',
                      applyText: 'Sign in',
                      closeText: 'Cancel',
                      noValidation: true,
                      width: '500px',
                      showOther: true,
                      onApply: (data: any) =>
                        user.signIn(data.email, data.walletType),
                    });

                    // if (!user.isMathWallet) {
                    //   actionModals.open(() => <AuthWarning />, {
                    //     title: '',
                    //     applyText: 'Got it',
                    //     closeText: '',
                    //     noValidation: true,
                    //     width: '500px',
                    //     showOther: true,
                    //     onApply: () => Promise.resolve(),
                    //   });
                    // } else {
                    //   user.signIn();
                    // }
                  }}
                >
                  Sign in
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }),
);
