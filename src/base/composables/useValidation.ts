import type { ValidateField, ValidatorMap } from './../../types';
import type { PaymentMethodField, PaymentMethodFieldValidationRules } from 'orchestrator-pp-core';

export default function(field: PaymentMethodField, validatorMap: ValidatorMap): ValidateField {
  const validate: ValidateField = async (value, formData) => {
    const failedRules: Partial<PaymentMethodFieldValidationRules> = {};
    const allRules = field.validation || {};

    for (const rule in allRules) {
      const options = allRules[rule] as unknown[];

      if (validatorMap[rule]) {
        const isValid = await validatorMap[rule](value, formData, ...options);

        if (!isValid) {
          failedRules[rule] = options;
        }
      }
    }

    return failedRules;
  };

  return validate;
}
