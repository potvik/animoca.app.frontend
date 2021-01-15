import * as React from 'react';
import { Layer, Box, Text } from 'grommet';

export const Loader: React.FC<any> = ({ label }: ({ label?: string })) => (
  <Layer position="center">
    <Box pad="small" gap="small">
      <Text>{label || 'Loading...'}</Text>
    </Box>
  </Layer>
);
Loader.displayName = 'Loader';
