import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'skype',
  location: 'us-east4'
};

export const createKudoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateKudo', inputVars);
}
createKudoRef.operationName = 'CreateKudo';

export function createKudo(dcOrVars, vars) {
  return executeMutation(createKudoRef(dcOrVars, vars));
}

export const listKudosForRecipientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListKudosForRecipient', inputVars);
}
listKudosForRecipientRef.operationName = 'ListKudosForRecipient';

export function listKudosForRecipient(dcOrVars, vars) {
  return executeQuery(listKudosForRecipientRef(dcOrVars, vars));
}

export const hideKudoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'HideKudo', inputVars);
}
hideKudoRef.operationName = 'HideKudo';

export function hideKudo(dcOrVars, vars) {
  return executeMutation(hideKudoRef(dcOrVars, vars));
}

export const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';

export function listCategories(dc) {
  return executeQuery(listCategoriesRef(dc));
}

