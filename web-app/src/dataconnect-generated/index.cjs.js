const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'skype',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createKudoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateKudo', inputVars);
}
createKudoRef.operationName = 'CreateKudo';
exports.createKudoRef = createKudoRef;

exports.createKudo = function createKudo(dcOrVars, vars) {
  return executeMutation(createKudoRef(dcOrVars, vars));
};

const listKudosForRecipientRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListKudosForRecipient', inputVars);
}
listKudosForRecipientRef.operationName = 'ListKudosForRecipient';
exports.listKudosForRecipientRef = listKudosForRecipientRef;

exports.listKudosForRecipient = function listKudosForRecipient(dcOrVars, vars) {
  return executeQuery(listKudosForRecipientRef(dcOrVars, vars));
};

const hideKudoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'HideKudo', inputVars);
}
hideKudoRef.operationName = 'HideKudo';
exports.hideKudoRef = hideKudoRef;

exports.hideKudo = function hideKudo(dcOrVars, vars) {
  return executeMutation(hideKudoRef(dcOrVars, vars));
};

const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';
exports.listCategoriesRef = listCategoriesRef;

exports.listCategories = function listCategories(dc) {
  return executeQuery(listCategoriesRef(dc));
};
