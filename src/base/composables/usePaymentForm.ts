import type { PaymentMethodField } from 'orchestrator-pp-core';
import type { PaymentForm } from './../../types';

async function validateFields(fields: PaymentMethodField[], data: Record<string, unknown>): Promise<boolean> {
  console.log(fields, data);

  return true;
}

export default function(fields: PaymentMethodField[]) {
  let collectedData: Record<string, unknown> = {};

  const paymentForm: PaymentForm = {
    fields,

    async onSubmit(data: Record<string, unknown>) {
      if (await validateFields(fields, data)) {
        collectedData = { ...data };
      } else {
        throw new Error('Invalid payment form data');
      }
    },
  }

  const getCollectedData = () => collectedData;

  return { paymentForm, getCollectedData };
}
