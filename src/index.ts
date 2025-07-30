import type { PaymentMethodFactory } from './types'
import makeBasePaymentMethod from './base';
import { makeSavedCardPaymentMethod } from './card';
import type { Api } from 'orchestrator-pp-core'

const usePaymentMethodFactory = (api: Api, token: string): PaymentMethodFactory => {
  return {
    fromConfig: async (config) => makeBasePaymentMethod(config),
    fromSavedCard: async (card) => makeSavedCardPaymentMethod(api, card, token),
  }
}

export * from './types';

export default usePaymentMethodFactory;
