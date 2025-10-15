import type { Api, Field, PaymentMethodData, SavedCard } from 'o10r-pp-core';
import { PaymentMode } from 'o10r-pp-core';
import { useForm } from 'o10r-pp-form';
import type { PaymentMethod, SavedCardPaymentMethod } from './../types';
import useGenerator from './../base/composables/useGenerator';

const visaIcon = `data:image/svg+xml,%3csvg%20width=\'36\'%20height=\'12\'%20viewBox=\'0%200%2036%2012\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath%20d=\'M13.6686%200.212102L8.95547%2011.8185H5.8805L3.56115%202.55606C3.42034%201.98555%203.2979%201.77655%202.86966%201.53619C2.17048%201.14469%201.01586%200.777384%200%200.549413L0.0689991%200.212102H5.01876C5.64969%200.212102%206.21687%200.645594%206.36012%201.3955L7.58505%208.11154L10.6124%200.211908L13.6686%200.212102ZM25.717%208.02909C25.7294%204.96581%2021.6131%204.79706%2021.6414%203.42865C21.6502%203.01219%2022.0344%202.56941%2022.8753%202.45639C23.2921%202.40008%2024.4406%202.35712%2025.7431%202.97581L26.254%200.514578C25.5541%200.252354%2024.6536%200%2023.5331%200C20.6578%200%2018.6343%201.5776%2018.6172%203.8366C18.5987%205.50748%2020.0615%206.43988%2021.1637%206.9951C22.2975%207.56367%2022.6779%207.92904%2022.6736%208.43762C22.6655%209.21617%2021.7693%209.55986%2020.9317%209.57341C19.4696%209.59663%2018.6212%209.16508%2017.9449%208.84054L17.4176%2011.3832C18.0973%2011.7051%2019.3519%2011.9859%2020.6525%2012C23.7086%2012%2025.7077%2010.4419%2025.717%208.02909ZM33.3096%2011.8187H36L33.6516%200.212295H31.1684C30.61%200.212295%2030.139%200.547864%2029.9305%201.0638L25.5654%2011.8187H28.6199L29.2264%2010.0849H32.9586L33.3096%2011.8187ZM30.0638%207.7061L31.5949%203.34834L32.4762%207.7061H30.0638ZM17.8251%200.212102L15.4197%2011.8185H12.5108L14.9172%200.212102H17.8251Z\'%20fill=\'%231434CB\'/%3e%3c/svg%3e`;
const mastercardIcon = `data:image/svg+xml,%3csvg%20width='30'%20height='20'%20viewBox='0%200%2030%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.9189%202.53174H19.0126V17.4683H10.9189V2.53174Z'%20fill='%23FF5F00'/%3e%3cpath%20d='M11.4326%2010.0007C11.4269%207.09244%2012.7285%204.34115%2014.9659%202.53186C11.1803%20-0.530228%205.71053%20-0.0829142%202.45399%203.55507C-0.817997%207.19471%20-0.817997%2012.8045%202.45399%2016.4441C5.71009%2020.0817%2011.1791%2020.5295%2014.9648%2017.4685C12.7276%2015.6594%2011.4261%2012.9086%2011.4315%2010.0007H11.4326Z'%20fill='%23EB001B'/%3e%3cpath%20d='M29.9308%2010.0008C29.9379%2013.6262%2027.9184%2016.9401%2024.724%2018.5449C21.5397%2020.1346%2017.7405%2019.7156%2014.9648%2017.4685C17.201%2015.658%2018.5025%2012.9076%2018.4993%209.99964C18.5028%207.09184%2017.2017%204.34148%2014.966%202.53076C17.7419%200.284065%2021.5411%20-0.134526%2024.7251%201.45552C27.9196%203.06032%2029.9391%206.37427%2029.9319%209.99964V10.0008H29.9308ZM29.1332%2016.2441V15.6406H29.3093V15.5157H28.8628V15.6406H29.0548V16.2441H29.1332ZM30.0001%2016.2441V15.5157H29.8649L29.707%2016.036L29.5502%2015.5157H29.4298V16.2441H29.5275V15.6984L29.674%2016.1725H29.7751L29.9217%2015.6984V16.2499L30.0001%2016.2441Z'%20fill='%23F79E1B'/%3e%3c/svg%3e`;

function adaptSchema(schema: Field[], paymentMode: PaymentMode, options?: Record<string, unknown>): Field[] {
  let fields: Field[] = schema;

  // removing cvv field if payment mode is tokenization
  if (paymentMode === PaymentMode.TOKENIZATION) {
    fields = fields.filter(field => field.name !== 'cvv');
  }

  // setting restrictions for allowed brands to `pan` validator
  if (Array.isArray(options?.allowed_brands)) {
    for (const field of fields) {
      if (field.validation?.pan) {
        field.validation.pan.push(
          options.allowed_brands as string[]
        );
      }
    }
  }

  return fields;
}

export function makeSavedCardPaymentMethod(api: Api, card: SavedCard, sid: string): SavedCardPaymentMethod {
  const { generateId } = useGenerator();
  const paymentForm = useForm([
    {
      name: "expiry_month",
      type: "tel",
      disabled: true,
      value: card.expiry_month,
    },
    {
      name: "expiry_year",
      type: "tel",
      disabled: true,
      value: card.expiry_year,
    },
    {
      name: "cvv",
      type: "password",
      validation: {
        required: [],
        cvv: [undefined]
      }
    },
  ]);

  return {
    id: generateId(),
    code: 'card',
    icon: card.type === 'visa' ? visaIcon : mastercardIcon,
    data: card,
    paymentForm: paymentForm,
    getCollectedData: () => {
      const paymentFormData = paymentForm.getCollectedData();

      return {
        id: card.id,
        ...paymentFormData,
      };
    },
    onRemove: async () => api.removeSavedCard(sid, card.id),
  };
}

export default function(config: PaymentMethodData, paymentMode: PaymentMode, options?: Record<string, unknown>): PaymentMethod {
  const { generateId } = useGenerator();
  const schema: Field[] = adaptSchema(config.schema, paymentMode, options);
  const paymentForm = useForm(schema);

  return {
    id: generateId(),
    code: config.code,
    // icon: config.icon,
    icon: '/images/pm/card.svg', // TODO it must come from backend, it is just example
    paymentForm: paymentForm,
    getCollectedData: paymentForm.getCollectedData
  }
}
