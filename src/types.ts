import type { PaymentMethodData, SavedCard } from 'orchestrator-pp-core';
import type { Form } from 'orchestrator-pp-form';

export interface PaymentMethodFactory {
  fromConfig: (config: PaymentMethodData) => Promise<PaymentMethod>;
  fromSavedCard: (card: SavedCard) => Promise<SavedCardPaymentMethod>;
}

export interface SavedCardPaymentMethod extends PaymentMethod {
  data: SavedCard,
  onRemove: () => Promise<void>,
}

export function isSavedCardPaymentMethod(
  paymentMethod: PaymentMethod
): paymentMethod is SavedCardPaymentMethod {
  return (paymentMethod as SavedCardPaymentMethod).data !== undefined;
}

export interface PaymentMethod {
  id: string,
  code: string,
  icon: string,
  paymentForm: Form,
  getCollectedData: () => Record<string, unknown>,
}
