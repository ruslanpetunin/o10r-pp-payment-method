import type { PaymentMethod, PaymentMethodFactory } from 'orchestrator-pp-flow';
import makeBasePaymentMethod from './base';

const paymentMethodFactory: PaymentMethodFactory = async (initData, projectSettings) => {
  const methods: PaymentMethod[] = [];

  for (const methodConfig of projectSettings.methods) {
    methods.push(makeBasePaymentMethod(methodConfig));
  }

  return methods;
};

export default paymentMethodFactory;
