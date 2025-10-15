import type { PaymentMethodData } from 'o10r-pp-core';
import { useForm } from 'o10r-pp-form';
import type { PaymentMethod } from './../types';
import useGenerator from './composables/useGenerator';

export default function(config: PaymentMethodData): PaymentMethod {
  const { generateId } = useGenerator();
  const paymentForm = useForm(config.schema);

  return {
    id: generateId(),
    code: config.code,
    // icon: config.icon,
    icon: '/images/pm/enthusiast.jpg', // TODO it must come from backend, it is just example
    paymentForm: paymentForm,
    getCollectedData: paymentForm.getCollectedData
  }
}
