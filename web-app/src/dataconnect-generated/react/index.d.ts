import { CreateKudoData, CreateKudoVariables, ListKudosForRecipientData, ListKudosForRecipientVariables, HideKudoData, HideKudoVariables, ListCategoriesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateKudo(options?: useDataConnectMutationOptions<CreateKudoData, FirebaseError, CreateKudoVariables>): UseDataConnectMutationResult<CreateKudoData, CreateKudoVariables>;
export function useCreateKudo(dc: DataConnect, options?: useDataConnectMutationOptions<CreateKudoData, FirebaseError, CreateKudoVariables>): UseDataConnectMutationResult<CreateKudoData, CreateKudoVariables>;

export function useListKudosForRecipient(vars: ListKudosForRecipientVariables, options?: useDataConnectQueryOptions<ListKudosForRecipientData>): UseDataConnectQueryResult<ListKudosForRecipientData, ListKudosForRecipientVariables>;
export function useListKudosForRecipient(dc: DataConnect, vars: ListKudosForRecipientVariables, options?: useDataConnectQueryOptions<ListKudosForRecipientData>): UseDataConnectQueryResult<ListKudosForRecipientData, ListKudosForRecipientVariables>;

export function useHideKudo(options?: useDataConnectMutationOptions<HideKudoData, FirebaseError, HideKudoVariables>): UseDataConnectMutationResult<HideKudoData, HideKudoVariables>;
export function useHideKudo(dc: DataConnect, options?: useDataConnectMutationOptions<HideKudoData, FirebaseError, HideKudoVariables>): UseDataConnectMutationResult<HideKudoData, HideKudoVariables>;

export function useListCategories(options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
export function useListCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
