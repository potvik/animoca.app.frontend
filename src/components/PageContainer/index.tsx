import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { IStyledChildrenProps } from 'interfaces';
import { withTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';

export const PageContainer: React.FC<IStyledChildrenProps<
  BoxProps
>> = withTheme(
  ({ children, theme, ...props }: IStyledChildrenProps<BoxProps>) => {
    //TODO: Придумать вариант, избавляющий от внутреннего div
    const isSmallMobile = useMediaQuery({ query: '(max-width: 600px)' });

    return (
      <Box
        style={{
          height: '100%',
        }}
        {...props}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: theme.palette.Basic100,
            justifyContent: 'normal',
            padding: isSmallMobile ? '0 15px' : '0px 32px',
          }}
        >
          {children}
        </div>
      </Box>
    );
  },
);
