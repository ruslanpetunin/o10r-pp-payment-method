import type { PaymentMethodData } from 'orchestrator-pp-core';
import type { PaymentMethod } from './../types';
import usePaymentForm from './composables/usePaymentForm';
import useGenerator from './composables/useGenerator';

export default function(config: PaymentMethodData): PaymentMethod {
  const { generateId } = useGenerator();
  const { paymentForm, getCollectedData } = usePaymentForm(config.fields);

  return {
    id: generateId(),
    code: config.code,
    icon: config.icon,
    paymentForm: paymentForm,
    getCollectedData: getCollectedData
  }
}
