import * as React from 'react';
import { BaseContainer, PageContainer } from 'components';
import { observer } from 'mobx-react-lite';
import { Pricing } from '../Landing/Pricing';
import { useStores } from '../../stores';
import { useEffect } from 'react';
import { SignIn } from '../../components/SignIn';

export const BuyLootBox = observer(() => {
  const { user, actionModals, routing } = useStores();

  useEffect(() => {
    if (!user.isAuthorized && user.status === 'success') {
      actionModals.open(SignIn, {
        title: 'Sign in',
        applyText: 'Sign in',
        closeText: 'Cancel',
        noValidation: true,
        width: '500px',
        showOther: true,
        onApply: (data: any) => user.signIn(data.email),
        onClose: () => {
          if (!user.isAuthorized) {
            routing.push('/');
          }
        },
      });
    }
  }, [user.status]);

  return (
    <BaseContainer>
      <PageContainer>
        <Pricing />
      </PageContainer>
    </BaseContainer>
  );
});
