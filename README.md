# o10r-pp-payment-method

`o10r-pp-payment-method` is a small TypeScript helper that constructs payment method objects for a payment page. The library works alongside [`o10r-pp-core`](https://github.com/ruslanpetunin/o10r-pp-core) and [`o10r-pp-form`](https://github.com/ruslanpetunin/o10r-pp-form).

It exposes a factory that is able to:

- build a generic `PaymentMethod` from a configuration object
- build a `SavedCardPaymentMethod` for a previously stored card

The returned objects contain an instance of `Form` from `o10r-pp-form` and helper methods for collecting data and interacting with saved cards.

---

## 📦 Installation

```bash
npm install o10r-pp-payment-method
```

> Requires **Node.js v24+**

---

## ⚡️ Usage

### 1. Create a factory

```ts
import createPaymentMethodFactory from 'o10r-pp-payment-method';
import type { Api } from 'o10r-pp-core';

// `api` should implement the `Api` interface from `o10r-pp-core`.
const api: Api = /* ... */;
const token = 'jwt-token';

const factory = createPaymentMethodFactory(api, token);
```

### 2. Build a payment method from configuration

```ts
import type { PaymentMethodData } from 'o10r-pp-core';

const config: PaymentMethodData = {
  code: 'card',
  icon: '/icons/card.svg',
  fields: [
    { name: 'number', type: 'tel', validation: { required: [] } },
    { name: 'cvv', type: 'password', validation: { required: [], cvv: [undefined] } },
  ],
};

const cardMethod = await factory.fromConfig(config);

// Use the form in your UI
render(cardMethod.paymentForm);

// When ready to submit
const payload = cardMethod.getCollectedData();
```

### 3. Build a payment method from a saved card

```ts
import type { SavedCard } from 'o10r-pp-core';

const savedCard: SavedCard = {
  id: '1',
  type: 'visa',
  last4: '4242',
  expiry_month: '12',
  expiry_year: '2026',
};

const savedCardMethod = await factory.fromSavedCard(savedCard);

// Remove the saved card when user requests it
await savedCardMethod.onRemove();
```

### 4. Work with generated methods

```ts
import { isSavedCardPaymentMethod } from 'o10r-pp-payment-method';

const method = await factory.fromConfig(config);

if (isSavedCardPaymentMethod(method)) {
  console.log('Saved card:', method.data.last4);
}

api.pay(token, method.getCollectedData());
```

---

## 📄 License

MIT
