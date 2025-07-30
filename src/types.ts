import type {
  PaymentMethodData,
  PaymentMethodField,
  PaymentMethodFieldValidationRules,
  SavedCard
} from 'orchestrator-pp-core'

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
  paymentForm: PaymentForm,
  getCollectedData: () => Record<string, unknown>,
}

export interface PaymentForm {
  fields: PaymentMethodField[],
  validate: ValidateForm,
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void,
}

export type ValidatorMap = Partial<{
  [K in keyof PaymentMethodFieldValidationRules]: Validator<K>
}>;

export type Validator<K extends keyof PaymentMethodFieldValidationRules> = (
  value: unknown,
  formData: Record<string, unknown>,
  ...options: PaymentMethodFieldValidationRules[K]
) => boolean | Promise<boolean>;

export type ValidateField = (value: unknown, formData: Record<string, unknown>) => Promise<Partial<PaymentMethodFieldValidationRules>>;

export type ValidateForm = (data: Record<string, unknown>) => Promise<FormValidationResult>;

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, Partial<PaymentMethodFieldValidationRules>>;
}
