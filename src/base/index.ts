import type { PaymentMethodData } from 'orchestrator-pp-core';
import type { PaymentMethod } from 'orchestrator-pp-flow'

export default function(config: PaymentMethodData): PaymentMethod {
  return {
    code: config.code,
    icon: config.icon,
    paymentForm: {
      fields: config.fields,
    },
  }

}
