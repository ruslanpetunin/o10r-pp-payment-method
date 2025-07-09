# orchestrator-pp-payment-method

`orchestrator-pp-payment-method` is a TypeScript library that provides a factory function for generating an array of `PaymentMethod` objects. It contains logic of payment methods.

These methods are created based on project settings and initialization data, both of which conform to interfaces from [`orchestrator-pp-core`](https://github.com/ruslanpetunin/orchestrator-pp-core).

---

## 📦 Installation

```bash
npm install orchestrator-pp-payment-method
```

> Requires **Node.js v24+**

---

## ⚡️ Usage

```ts
import paymentMethodFactory from 'orchestrator-pp-payment-method';

const methods = await paymentMethodFactory(initData, projectSettings);
```

* `initData`: Initialization data extracted from a JWT token
* `projectSettings`: Configuration received from the API
* Returns: An array of `PaymentMethod` objects ready to be used in the payment page UI

All related interfaces (`InitData`, `ProjectSettings`, `PaymentMethod`) are defined in the `orchestrator-pp-core` package.

---
