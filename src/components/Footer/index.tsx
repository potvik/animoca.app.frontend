import * as React from 'react';
import {Box} from 'grommet';
// import { Facebook } from 'grommet-icons';

export const Footer = props => (
  <Box
    flex={{shrink: 0}}
    style={{backgroundColor: props.bg}}
    direction="row"
    justify="center"
    pad={{horizontal: 'xlarge', vertical: 'large'}}
    {...props}
  >
    <a href='https://harmony.one/' target='_blank'>
      <img alt="Harmony One" src='/harmony.svg' style={{width: 50, height: 50, marginRight: 20}}/>
    </a>

    <a href='https://harmony.one/twitter' target='_blank'>
      <img title="Twitter" src='/twitter.png' style={{width: 50, height: 50, marginRight: 20}}/>
    </a>

    <a href='https://harmony.one/youtube' target='_blank'>
      <img src='/youtube.png' style={{width: 50, height: 50, marginRight: 20}}/>
    </a>

    <a href='https://harmony.one/telegram' target='_blank'>
      <img src='/telegram.png' style={{width: 50, height: 50, marginRight: 20}}/>
    </a>

    <a href='https://harmony.one/discord' target='_blank'>
      <img src='/discord.png' style={{width: 50, height: 50}}/>
    </a>

  </Box>
);
