import type { PaymentMethodData, SavedCard } from 'o10r-pp-core';
import type { Form } from 'o10r-pp-form';
import { PaymentMode } from "o10r-pp-core";

export interface PaymentMethodFactory {
  fromConfig: (config: PaymentMethodData, paymentMode: PaymentMode, options?: Record<string, unknown>) => Promise<PaymentMethod>;
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
