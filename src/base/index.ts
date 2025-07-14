import type { PaymentMethodData, PaymentMethod } from 'orchestrator-pp-core';
import usePaymentForm from './composables/usePaymentForm';

export default function(config: PaymentMethodData): PaymentMethod {
  const { paymentForm, getCollectedData } = usePaymentForm(config.fields);

  return {
    code: config.code,
    icon: config.icon,
    paymentForm: paymentForm,
    getCollectedData: getCollectedData
  }
}
