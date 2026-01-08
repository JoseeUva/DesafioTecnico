import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateKudoData {
  kudo_insert: Kudo_Key;
}

export interface CreateKudoVariables {
  recipientId: UUIDString;
  categoryId: UUIDString;
  message: string;
}

export interface HideKudoData {
  kudo_update?: Kudo_Key | null;
}

export interface HideKudoVariables {
  kudoId: UUIDString;
}

export interface Kudo_Key {
  id: UUIDString;
  __typename?: 'Kudo_Key';
}

export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
  } & Category_Key)[];
}

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

export interface ListKudosForRecipientVariables {
  recipientId: UUIDString;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateKudoRef {
  (vars: CreateKudoVariables): MutationRef<CreateKudoData, CreateKudoVariables>;
  (dc: DataConnect, vars: CreateKudoVariables): MutationRef<CreateKudoData, CreateKudoVariables>;
  operationName: string;
}
export const createKudoRef: CreateKudoRef;

export function createKudo(vars: CreateKudoVariables): MutationPromise<CreateKudoData, CreateKudoVariables>;
export function createKudo(dc: DataConnect, vars: CreateKudoVariables): MutationPromise<CreateKudoData, CreateKudoVariables>;

interface ListKudosForRecipientRef {
  (vars: ListKudosForRecipientVariables): QueryRef<ListKudosForRecipientData, ListKudosForRecipientVariables>;
  (dc: DataConnect, vars: ListKudosForRecipientVariables): QueryRef<ListKudosForRecipientData, ListKudosForRecipientVariables>;
  operationName: string;
}
export const listKudosForRecipientRef: ListKudosForRecipientRef;

export function listKudosForRecipient(vars: ListKudosForRecipientVariables): QueryPromise<ListKudosForRecipientData, ListKudosForRecipientVariables>;
export function listKudosForRecipient(dc: DataConnect, vars: ListKudosForRecipientVariables): QueryPromise<ListKudosForRecipientData, ListKudosForRecipientVariables>;

interface HideKudoRef {
  (vars: HideKudoVariables): MutationRef<HideKudoData, HideKudoVariables>;
  (dc: DataConnect, vars: HideKudoVariables): MutationRef<HideKudoData, HideKudoVariables>;
  operationName: string;
}
export const hideKudoRef: HideKudoRef;

export function hideKudo(vars: HideKudoVariables): MutationPromise<HideKudoData, HideKudoVariables>;
export function hideKudo(dc: DataConnect, vars: HideKudoVariables): MutationPromise<HideKudoData, HideKudoVariables>;

interface ListCategoriesRef {
  (): QueryRef<ListCategoriesData, undefined>;
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect): QueryPromise<ListCategoriesData, undefined>;

