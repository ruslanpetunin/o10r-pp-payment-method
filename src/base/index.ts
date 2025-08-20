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
    icon: 'https://js.stripe.com/v3/fingerprinted/img/card-ce24697297bd3c6a00fdd2fb6f760f0d.svg',
    paymentForm: paymentForm,
    getCollectedData: paymentForm.getCollectedData
  }
}
