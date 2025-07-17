import type {
  InitData,
  PaymentMethodField,
  PaymentMethodFieldValidationRules,
  ProjectSettingsData
} from 'orchestrator-pp-core'

export type PaymentMethodFactory = (initData: InitData, projectSettings: ProjectSettingsData) => Promise<PaymentMethod[]>;

export interface PaymentMethod {
  code: string,
  icon: string,
  paymentForm: PaymentForm,
  getCollectedData: () => Record<string, unknown>,
  onRemove?: () => Promise<void>,
}

export interface PaymentForm {
  fields: PaymentMethodField[],
  validate: ValidateForm,
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void,
}

export type ValidatorMap = {
  [K in keyof PaymentMethodFieldValidationRules]: Validator<K>
};

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
