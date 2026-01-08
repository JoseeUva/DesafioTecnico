# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListKudosForRecipient*](#listkudosforrecipient)
  - [*ListCategories*](#listcategories)
- [**Mutations**](#mutations)
  - [*CreateKudo*](#createkudo)
  - [*HideKudo*](#hidekudo)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListKudosForRecipient
You can execute the `ListKudosForRecipient` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listKudosForRecipient(vars: ListKudosForRecipientVariables): QueryPromise<ListKudosForRecipientData, ListKudosForRecipientVariables>;

interface ListKudosForRecipientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListKudosForRecipientVariables): QueryRef<ListKudosForRecipientData, ListKudosForRecipientVariables>;
}
export const listKudosForRecipientRef: ListKudosForRecipientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listKudosForRecipient(dc: DataConnect, vars: ListKudosForRecipientVariables): QueryPromise<ListKudosForRecipientData, ListKudosForRecipientVariables>;

interface ListKudosForRecipientRef {
  ...
  (dc: DataConnect, vars: ListKudosForRecipientVariables): QueryRef<ListKudosForRecipientData, ListKudosForRecipientVariables>;
}
export const listKudosForRecipientRef: ListKudosForRecipientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listKudosForRecipientRef:
```typescript
const name = listKudosForRecipientRef.operationName;
console.log(name);
```

### Variables
The `ListKudosForRecipient` query requires an argument of type `ListKudosForRecipientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListKudosForRecipientVariables {
  recipientId: UUIDString;
}
```
### Return Type
Recall that executing the `ListKudosForRecipient` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListKudosForRecipientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListKudosForRecipientData {
  kudos: ({
    id: UUIDString;
    message: string;
    sender: {
      displayName: string;
    };
      category: {
        name: string;
      };
        createdAt: TimestampString;
  } & Kudo_Key)[];
}
```
### Using `ListKudosForRecipient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listKudosForRecipient, ListKudosForRecipientVariables } from '@dataconnect/generated';

// The `ListKudosForRecipient` query requires an argument of type `ListKudosForRecipientVariables`:
const listKudosForRecipientVars: ListKudosForRecipientVariables = {
  recipientId: ..., 
};

// Call the `listKudosForRecipient()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listKudosForRecipient(listKudosForRecipientVars);
// Variables can be defined inline as well.
const { data } = await listKudosForRecipient({ recipientId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listKudosForRecipient(dataConnect, listKudosForRecipientVars);

console.log(data.kudos);

// Or, you can use the `Promise` API.
listKudosForRecipient(listKudosForRecipientVars).then((response) => {
  const data = response.data;
  console.log(data.kudos);
});
```

### Using `ListKudosForRecipient`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listKudosForRecipientRef, ListKudosForRecipientVariables } from '@dataconnect/generated';

// The `ListKudosForRecipient` query requires an argument of type `ListKudosForRecipientVariables`:
const listKudosForRecipientVars: ListKudosForRecipientVariables = {
  recipientId: ..., 
};

// Call the `listKudosForRecipientRef()` function to get a reference to the query.
const ref = listKudosForRecipientRef(listKudosForRecipientVars);
// Variables can be defined inline as well.
const ref = listKudosForRecipientRef({ recipientId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listKudosForRecipientRef(dataConnect, listKudosForRecipientVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.kudos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.kudos);
});
```

## ListCategories
You can execute the `ListCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCategories(): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategories(dc: DataConnect): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesRef:
```typescript
const name = listCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCategories` query has no variables.
### Return Type
Recall that executing the `ListCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
  } & Category_Key)[];
}
```
### Using `ListCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategories } from '@dataconnect/generated';


// Call the `listCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesRef } from '@dataconnect/generated';


// Call the `listCategoriesRef()` function to get a reference to the query.
const ref = listCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateKudo
You can execute the `CreateKudo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createKudo(vars: CreateKudoVariables): MutationPromise<CreateKudoData, CreateKudoVariables>;

interface CreateKudoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateKudoVariables): MutationRef<CreateKudoData, CreateKudoVariables>;
}
export const createKudoRef: CreateKudoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createKudo(dc: DataConnect, vars: CreateKudoVariables): MutationPromise<CreateKudoData, CreateKudoVariables>;

interface CreateKudoRef {
  ...
  (dc: DataConnect, vars: CreateKudoVariables): MutationRef<CreateKudoData, CreateKudoVariables>;
}
export const createKudoRef: CreateKudoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createKudoRef:
```typescript
const name = createKudoRef.operationName;
console.log(name);
```

### Variables
The `CreateKudo` mutation requires an argument of type `CreateKudoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateKudoVariables {
  recipientId: UUIDString;
  categoryId: UUIDString;
  message: string;
}
```
### Return Type
Recall that executing the `CreateKudo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateKudoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateKudoData {
  kudo_insert: Kudo_Key;
}
```
### Using `CreateKudo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createKudo, CreateKudoVariables } from '@dataconnect/generated';

// The `CreateKudo` mutation requires an argument of type `CreateKudoVariables`:
const createKudoVars: CreateKudoVariables = {
  recipientId: ..., 
  categoryId: ..., 
  message: ..., 
};

// Call the `createKudo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createKudo(createKudoVars);
// Variables can be defined inline as well.
const { data } = await createKudo({ recipientId: ..., categoryId: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createKudo(dataConnect, createKudoVars);

console.log(data.kudo_insert);

// Or, you can use the `Promise` API.
createKudo(createKudoVars).then((response) => {
  const data = response.data;
  console.log(data.kudo_insert);
});
```

### Using `CreateKudo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createKudoRef, CreateKudoVariables } from '@dataconnect/generated';

// The `CreateKudo` mutation requires an argument of type `CreateKudoVariables`:
const createKudoVars: CreateKudoVariables = {
  recipientId: ..., 
  categoryId: ..., 
  message: ..., 
};

// Call the `createKudoRef()` function to get a reference to the mutation.
const ref = createKudoRef(createKudoVars);
// Variables can be defined inline as well.
const ref = createKudoRef({ recipientId: ..., categoryId: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createKudoRef(dataConnect, createKudoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.kudo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.kudo_insert);
});
```

## HideKudo
You can execute the `HideKudo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
hideKudo(vars: HideKudoVariables): MutationPromise<HideKudoData, HideKudoVariables>;

interface HideKudoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: HideKudoVariables): MutationRef<HideKudoData, HideKudoVariables>;
}
export const hideKudoRef: HideKudoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
hideKudo(dc: DataConnect, vars: HideKudoVariables): MutationPromise<HideKudoData, HideKudoVariables>;

interface HideKudoRef {
  ...
  (dc: DataConnect, vars: HideKudoVariables): MutationRef<HideKudoData, HideKudoVariables>;
}
export const hideKudoRef: HideKudoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the hideKudoRef:
```typescript
const name = hideKudoRef.operationName;
console.log(name);
```

### Variables
The `HideKudo` mutation requires an argument of type `HideKudoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface HideKudoVariables {
  kudoId: UUIDString;
}
```
### Return Type
Recall that executing the `HideKudo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `HideKudoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface HideKudoData {
  kudo_update?: Kudo_Key | null;
}
```
### Using `HideKudo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, hideKudo, HideKudoVariables } from '@dataconnect/generated';

// The `HideKudo` mutation requires an argument of type `HideKudoVariables`:
const hideKudoVars: HideKudoVariables = {
  kudoId: ..., 
};

// Call the `hideKudo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await hideKudo(hideKudoVars);
// Variables can be defined inline as well.
const { data } = await hideKudo({ kudoId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await hideKudo(dataConnect, hideKudoVars);

console.log(data.kudo_update);

// Or, you can use the `Promise` API.
hideKudo(hideKudoVars).then((response) => {
  const data = response.data;
  console.log(data.kudo_update);
});
```

### Using `HideKudo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, hideKudoRef, HideKudoVariables } from '@dataconnect/generated';

// The `HideKudo` mutation requires an argument of type `HideKudoVariables`:
const hideKudoVars: HideKudoVariables = {
  kudoId: ..., 
};

// Call the `hideKudoRef()` function to get a reference to the mutation.
const ref = hideKudoRef(hideKudoVars);
// Variables can be defined inline as well.
const ref = hideKudoRef({ kudoId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = hideKudoRef(dataConnect, hideKudoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.kudo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.kudo_update);
});
```

