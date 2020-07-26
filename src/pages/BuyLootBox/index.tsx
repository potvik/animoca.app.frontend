import * as React from 'react';
import { BaseContainer, PageContainer } from 'components';
import { observer } from 'mobx-react-lite';
import { Pricing } from '../Landing/Pricing';

export const BuyLootBox = observer(() => {
  return (
    <BaseContainer>
      <PageContainer>
        <Pricing />
      </PageContainer>
    </BaseContainer>
  );
});
