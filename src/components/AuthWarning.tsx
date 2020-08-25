import React from 'react';
import { Box } from 'grommet';

export const AuthWarning = () => (
  <Box>
    <div>
      <p>
        Looks like you don't have the Harmony One Wallet extension installed
        yet. Head over to the
        <a
          href="https://chrome.google.com/webstore/detail/harmony-one-wallet/gldpceolgfpjnajainimdfghhhgcnfmf"
          target="_blank"
          rel="noopener norefferer"
          style={{ margin: '0 5px' }}
        >
          Harmony One Wallet
        </a>
        to quickly install the extension.
      </p>
    </div>
  </Box>
);
