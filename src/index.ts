import type { PaymentMethodFactory } from './types'
import makeBasePaymentMethod from './base';
import { default as makeCardPaymentMethod,  makeSavedCardPaymentMethod } from './card';
import type { Api } from 'o10r-pp-core'

export * from 'o10r-pp-form';
export type * from 'o10r-pp-form';

export * from './types';

export default function (api: Api, sid: string): PaymentMethodFactory {
  return {
    fromSavedCard: async (card) => makeSavedCardPaymentMethod(api, card, sid),
    fromConfig: async (config,  paymentMode, options) => {
      if (config.code === 'card') {
        return makeCardPaymentMethod(config, paymentMode, options);
      }

      return makeBasePaymentMethod(config);
    },

  }
};
