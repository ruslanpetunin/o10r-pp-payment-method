import type { PaymentMethodFactory } from './types'
import makeBasePaymentMethod from './base';
import { makeSavedCardPaymentMethod } from './card';
import type { Api } from 'o10r-pp-core'

export * from 'o10r-pp-form';
export type * from 'o10r-pp-form';

export * from './types';

export default function (api: Api, sid: string): PaymentMethodFactory {
  return {
    fromConfig: async (config) => makeBasePaymentMethod(config),
    fromSavedCard: async (card) => makeSavedCardPaymentMethod(api, card, sid),
  }
};
