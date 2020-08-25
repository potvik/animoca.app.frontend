import * as React from 'react';
import { Box } from 'grommet';
import { useStores } from 'stores';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import * as styles from './landing-styles.styl';
import styled from 'styled-components';
import { Title, Text, Button } from 'components/Base';
import { Pricing } from './Pricing';
import CountdownTimer from 'react-component-countdown-timer';
import { SignIn } from '../../components/SignIn';
import moment from 'moment';
import { download } from '../../utils';

const MainLogo = styled.img`
  width: auto;
  height: 100px;
  margin-left: -46px;
  z-index: 999;
`;

const b = moment();
const a = moment('20200901', 'YYYYMMDD');

const settings = {
  count: a.diff(b) / 1000,
  border: true,
  showTitle: true,
  noPoints: true,
};

export const Landing = observer(() => {
  const { routing, actionModals, user, tokenList } = useStores();

  useEffect(() => {
    // soccerPlayers.setMaxDisplay(20);
    // soccerPlayers.getList();
  }, []);

  const signIn = useCallback(() => {
    if (!user.isAuthorized) {
      actionModals.open(SignIn, {
        title: 'Sign in',
        applyText: 'Sign in',
        closeText: 'Cancel',
        noValidation: true,
        width: '500px',
        showOther: true,
        onApply: (data: any) => user.signIn(data.email, data.walletType),
      });
    } else {
      actionModals.open(
        () => (
          <Box pad="large">
            <Text>You are already authorised</Text>
          </Box>
        ),
        {
          title: 'Sign in',
          applyText: 'Go to buy',
          closeText: 'Cancel',
          noValidation: true,
          width: '500px',
          showOther: true,
          onApply: () => {
            routing.push('/buy');
            return Promise.resolve(true);
          },
        },
      );
    }
  }, []);

  return (
    <Box direction="column" justify="between" align="center">
      <Box className={styles.mainBlock}>
        <Box
          pad={{ top: '60px', bottom: '50px' }}
          className={styles.pageContent}
        >
          <img src="/landing/main/dragon.png" className={styles.dragon} />
          <img src="/landing/main/heroes.png" className={styles.heroes} />
          <img src="/landing/main/gold.png" className={styles.gold} />

          <Box
            direction="column"
            align="start"
            justify="start"
            style={{ height: '100%' }}
          >
            <MainLogo src="main_logo.png" />

            <Box
              direction="column"
              margin={{ top: '40px' }}
              justify="around"
              style={{ maxWidth: 460, height: '100%' }}
            >
              <Title
                style={{
                  textShadow: '3px 2px 10px #000000',
                  // textShadow:
                  //     '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                  fontWeight: 600,
                  fontSize: 40,
                  zIndex: 999,
                  // color: '#f9ca36',
                  // color: 'rgb(249 183 18)',
                  color: 'white',
                  letterSpacing: '0.02em',
                  fontFamily:
                    'wfont_5de4af_58d65082edf1476c99721446ac4ddf3a,wf_58d65082edf1476c99721446a,orig_supercellmagic_regular',
                }}
                className={styles.mainTitle}
                color="white"
              >
                First Official Chest
                <br /> <span style={{ color: '#f9ca36' }}>Sale</span> Begins
              </Title>

              <Box
                direction="column"
                pad="large"
                gap="22px"
                className={styles.specialBlock}
              >
                <Text
                  // style={{ textShadow: '1px 4px 12px #000000' }}
                  color="white"
                  style={{
                    fontSize: '19px',
                    textShadow: '1px 4px 12px #000000',
                  }}
                >
                  Limited Edition NFT Chests, include a huge discount on in-game
                  items. Each chest includes a 150% extra gems, VIP points and
                  an NFT collectible card which will earn you ONE tokens when
                  you stake on the Harmony network.
                  <b
                    style={{
                      textTransform: 'uppercase',
                      color: '#e7ab10',
                      margin: '15px 0 -5px 0',
                      textAlign: 'center',
                      display: 'block',
                    }}
                  >
                    This offer ends
                  </b>
                </Text>
                <CountdownTimer className={styles.timer} {...settings} />
                <Button
                  style={{
                    width: '100%',
                    height: '70px',
                    alignItems: 'center',
                    fontWeight: 500,
                    fontSize: 25,
                    marginTop: 10,
                  }}
                  onClick={() => routing.push('/buy')}
                >
                  Buy now
                </Button>
              </Box>

              {/*{user.isAuthorized ? (*/}
              {/*  <Button*/}
              {/*    bgColor="rgb(0, 173, 232)"*/}
              {/*    size="xxlarge"*/}
              {/*    onClick={() => routing.push('/my-cards')}*/}
              {/*  >*/}
              {/*    My cards ({tokenList.list.length})*/}
              {/*  </Button>*/}
              {/*) : null}*/}
            </Box>

            <Box
              direction="row"
              align="center"
              justify="end"
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '-40px',
              }}
            >
              <a href="https://apps.apple.com/app/apple-store/id1419991954">
                <img
                  src="/landing/main/app-store.png"
                  className={styles.appStore}
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.animocabrands.google.beastquest.towerdefense.td">
                <img src="/landing/main/gp.png" className={styles.googlePlay} />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.howToBuy}>
        <Box
          pad={{ top: '120px', bottom: '50px' }}
          className={styles.pageContent}
          direction="column"
          align="center"
        >
          <Title
            color="white"
            style={{
              fontWeight: 600,
              fontSize: 36,
              marginBottom: 20,
            }}
          >
            How to buy
          </Title>
          <Text color="white">
            First time buying digital goods? Follow the tutorial below to
            purchase these super valuable Crazy Defense Heroes NFT chests!
          </Text>

          <Box
            pad={{ vertical: '60px' }}
            className={styles.pageContent}
            direction="row"
            gap="20px"
            justify="center"
            style={{ flexWrap: 'wrap' }}
          >
            <Box className={styles.reason}>
              <div className={styles.number}>1</div>
              <div className={styles.imageContainer}>
                <img src="/landing/how-to-buy/1.png" />
              </div>
              <div className={styles.smallTitle}>
                <Text>Create a digital wallet</Text>
              </div>
              <div className={styles.description}>
                <Text>
                  Click the button below to create a wallet using your email
                </Text>
              </div>
              <Button onClick={signIn}>Create wallet</Button>
            </Box>

            <Box className={styles.reason}>
              <div className={styles.number}>2</div>
              <div className={styles.imageContainer}>
                <img src="/landing/how-to-buy/2.png" />
              </div>
              <div className={styles.smallTitle}>
                <Text>Download Beast Quest</Text>
              </div>
              <div className={styles.description}>
                <Text>
                  If you don't already have a CDH account, please download the
                  game first. You need an User ID to get these special offers.
                </Text>
              </div>
              <a href="https://bquh2.onelink.me/b04p/d96d406e" target="_blank">
                <Button btnType="href">Download Now</Button>
              </a>
            </Box>

            <Box className={styles.reason}>
              <div className={styles.number}>3</div>
              <div className={styles.imageContainer}>
                <img src="/landing/how-to-buy/3.png" />
              </div>
              <div className={styles.smallTitle}>
                <Text>Get your game User ID</Text>
              </div>
              <div className={styles.description}>
                <Text>
                  After completing the tutorial in game, find your User ID in
                  Settings.
                </Text>
              </div>
              <Button
                onClick={() => {
                  actionModals.open(
                    () => (
                      <Box pad="medium">
                        <Title>
                          How to find your in-game user ID on Beast Quest
                          Ultimate Heroes
                        </Title>
                        <Box margin={{ top: 'large' }}>
                          <Text>
                            <ul>
                              <li>
                                You need to first finish the tutorial (first 3
                                levels)
                              </li>
                              <li>
                                Then you will be able to access to the main
                                menu.
                              </li>
                              <li>
                                Tap the setting button on the top right corner
                                to open the setting menu
                              </li>
                              <li>
                                You will find your user ID at the bottom right
                                corner
                              </li>
                            </ul>
                          </Text>
                          <img src="/landing/how-to-buy/help.png" />
                        </Box>
                      </Box>
                    ),
                    {
                      title: 'How to find',
                      applyText: 'Got it',
                      closeText: '',
                      noValidation: true,
                      width: '700px',
                      showOther: true,
                      onApply: () => {
                        return Promise.resolve(true);
                      },
                    },
                  );
                }}
              >
                How to find
              </Button>
            </Box>

            <Box className={styles.reason}>
              <div className={styles.number}>4</div>
              <div className={styles.imageContainer}>
                <img src="/landing/how-to-buy/4.png" />
              </div>
              <div className={styles.smallTitle}>
                <Text>Top up</Text>
              </div>
              <div className={styles.description}>
                <Text>
                  You will need to add ONE tokens to your digital wallet to
                  enjoy these special offers
                </Text>
              </div>
              <Button
                onClick={() => {
                  if (user.isAuthorized) {
                    routing.push('/buy');
                  } else {
                    signIn();
                  }
                }}
              >
                Top Up
              </Button>
            </Box>

            <Box className={styles.reason}>
              <div className={styles.number}>5</div>
              <div className={styles.imageContainer}>
                <img src="/landing/how-to-buy/5.png" />
              </div>
              <div className={styles.smallTitle}>
                <Text>Purchase Super Value Chests</Text>
              </div>
              <div className={styles.description}>
                <Text>
                  Once you have purchased a chest, the Collectible Card will be
                  stored in your digital wallet.
                </Text>
              </div>
              <Button onClick={() => routing.push('/buy')}>Buy now</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.needToBuy}>
        <Box
          pad={{ top: '120px', bottom: '100px' }}
          className={styles.pageContent}
          direction="row"
          align="center"
        >
          <Box>
            <Title color="white">
              Do I need to buy NFTs to enjoy Beast Quest Ultimate Heroes?
            </Title>
          </Box>
          <Box>
            <Text color="white">
              No, NTFs are not essential for players to play the game. You might
              prefer to fight the battles in order to complete the different
              levels, which is the fun way of playing the game (we’ve designed
              the game to give you lots of cool beasts to battle!). If you
              decide to buy NFTs, please ask bill payer’s permission and make
              sure they have read and understood the process above before you
              proceed.
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className={styles.pricing}>
        <Box
          pad={{ top: '120px', bottom: '100px' }}
          className={styles.pageContent}
          direction="column"
          align="center"
        >
          <Title
            style={{
              fontWeight: 600,
              fontSize: 36,
              marginBottom: 20,
            }}
            color="white"
          >
            Pricing
          </Title>
          <Pricing />
        </Box>
      </Box>
    </Box>
  );
});
