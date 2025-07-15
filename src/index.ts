import type { PaymentMethod, PaymentMethodFactory } from './types';
import makeBasePaymentMethod from './base';

const paymentMethodFactory: PaymentMethodFactory = async (initData, projectSettings) => {
  const methods: PaymentMethod[] = [];

  for (const methodConfig of projectSettings.methods) {
    methods.push(makeBasePaymentMethod(methodConfig));
  }

  return methods;
};

export * from './types';

export default paymentMethodFactory;
