import type { PaymentMethodData, PaymentMethod } from 'orchestrator-pp-core';

export default function(config: PaymentMethodData): PaymentMethod {
  return {
    code: config.code,
    icon: config.icon,
    paymentForm: {
      fields: config.fields,
    },
  }

}
