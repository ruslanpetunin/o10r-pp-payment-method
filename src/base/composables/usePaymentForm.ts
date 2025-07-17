import type { PaymentMethodField } from 'orchestrator-pp-core';
import type {
  PaymentForm,
  ValidateForm,
  ValidateField,
  ValidatorMap,
  FormValidationResult
} from './../../types';
import required from './../validators/required';
import useValidation from './useValidation';

function makeFieldValidators(fields: PaymentMethodField[]) {
  const result: Record<string, ValidateField> = {};
  const validatorMap: ValidatorMap = { required };

  for (const field of fields) {
    result[field.name] = useValidation(field, validatorMap);
  }

  return result;
}

function makeValidateFormFn(fields: PaymentMethodField[]): ValidateForm {
  const fieldValidators: Record<string, ValidateField> = makeFieldValidators(fields);

  return async (data: Record<string, unknown>) => {
    const result: FormValidationResult = { isValid: true, errors: {} };

    for (const field of fields) {
      const validateField = fieldValidators[field.name];

      if (validateField) {
        const errors = await validateField(data[field.name], data);

        if (Object.keys(errors).length) {
          result.isValid = false;
          result.errors[field.name] = errors;
        }
      }
    }

    return result;
  };
}

function makeOnSubmitFn(fields: PaymentMethodField[], validate: ValidateForm) {
  let collectedData: Record<string, unknown> = {};

  const getCollectedData = () => collectedData;
  const onSubmit = async (data: Record<string, unknown>) => {
    const { isValid } = await validate(data);

    if (isValid) {
      collectedData = { ...data };
    } else {
      throw new Error('Invalid payment form data');
    }
  };


  return { onSubmit, getCollectedData };
}

export default function(fields: PaymentMethodField[]) {
  const validate = makeValidateFormFn(fields);
  const { onSubmit, getCollectedData } = makeOnSubmitFn(fields, validate);

  const paymentForm: PaymentForm = {
    fields,
    validate,
    onSubmit
  }

  return { paymentForm, getCollectedData };
}
