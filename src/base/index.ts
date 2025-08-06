import type { PaymentMethodData } from 'orchestrator-pp-core';
import { useForm } from 'orchestrator-pp-form';
import type { PaymentMethod } from './../types';
import useGenerator from './composables/useGenerator';

export default function(config: PaymentMethodData): PaymentMethod {
  const { generateId } = useGenerator();
  const paymentForm = useForm(config.fields);

  return {
    id: generateId(),
    code: config.code,
    icon: config.icon,
    paymentForm: paymentForm,
    getCollectedData: paymentForm.getCollectedData
  }
}
