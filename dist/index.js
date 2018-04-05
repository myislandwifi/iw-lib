"use strict";
var BillState;
(function (BillState) {
    BillState["unpaid"] = "unpaid";
    BillState["paid"] = "paid";
})(BillState || (BillState = {}));
;
var AssetActionDefinition;
(function (AssetActionDefinition) {
    AssetActionDefinition["checkin"] = "checkin";
    AssetActionDefinition["checkout"] = "checkout";
})(AssetActionDefinition || (AssetActionDefinition = {}));
;
var AssetState;
(function (AssetState) {
    AssetState["inventory"] = "Inventory";
    AssetState["leased"] = "Leased";
    AssetState["missing"] = "Missing";
    AssetState["nonreturn"] = "Nonreturn";
    AssetState["damaged"] = "Damaged";
})(AssetState || (AssetState = {}));
;
var CustomerFaultReason;
(function (CustomerFaultReason) {
    CustomerFaultReason["waterDamage"] = "Water Damage";
    CustomerFaultReason["physicalDamage"] = "Physical Damage";
    CustomerFaultReason["unitTamperApparent"] = "Unit tamper apparent";
    CustomerFaultReason["simCardRemoved"] = "Sim Card Removed";
    CustomerFaultReason["screenBroken"] = "Screen Broken";
    CustomerFaultReason["unitHardReset"] = "Unit Hard Reset";
    CustomerFaultReason["other"] = "Other";
})(CustomerFaultReason || (CustomerFaultReason = {}));
;
var AgentActivityType;
(function (AgentActivityType) {
    AgentActivityType["login"] = "login";
    AgentActivityType["logout"] = "logout";
    AgentActivityType["assetCheckin"] = "assetCheckin";
    AgentActivityType["assetCheckout"] = "assetCheckout";
})(AgentActivityType || (AgentActivityType = {}));
;
var ContractType;
(function (ContractType) {
    ContractType["DAILY"] = "DAILY";
    ContractType["OVERNIGHT"] = "OVERNIGHT";
    ContractType["MULTIPLE_DAYS"] = "MULTIPLE_DAYS";
    ContractType["WEEKLY"] = "WEEKLY";
    ContractType["MONTHLY"] = "MONTHLY";
    ContractType["QUICK_CONNECT"] = "QUICK_CONNECT";
})(ContractType || (ContractType = {}));
;
var ContractState;
(function (ContractState) {
    ContractState[ContractState["draft"] = 100] = "draft";
    ContractState[ContractState["active"] = 200] = "active";
    ContractState[ContractState["complete"] = 300] = "complete";
    ContractState[ContractState["breached"] = 400] = "breached";
})(ContractState || (ContractState = {}));
;
var ContractSubstate;
(function (ContractSubstate) {
    ContractSubstate["draft"] = "Draft";
    ContractSubstate["signed"] = "Signed";
    ContractSubstate["paymentProcessed"] = "Payment Processed";
    ContractSubstate["active"] = "Active";
    ContractSubstate["complete"] = "Complete";
    ContractSubstate["breached"] = "Breached";
    ContractSubstate["archived"] = "Archived";
})(ContractSubstate || (ContractSubstate = {}));
;
var StoreLocationRegion;
(function (StoreLocationRegion) {
    StoreLocationRegion["FREEPORT"] = "FREEPORT";
    StoreLocationRegion["NASSAU"] = "NASSAU";
})(StoreLocationRegion || (StoreLocationRegion = {}));
;
var StoreLocationConfigKeys;
(function (StoreLocationConfigKeys) {
    StoreLocationConfigKeys["PRICE_MODIFIER"] = "PRICE_MODIFIER";
    StoreLocationConfigKeys["CONTRACT_TYPES_ALLOWED"] = "CONTRACT_TYPES_ALLOWED";
})(StoreLocationConfigKeys || (StoreLocationConfigKeys = {}));
;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["card"] = "card";
    PaymentMethod["cash"] = "cash";
})(PaymentMethod || (PaymentMethod = {}));
;
var TransactionType;
(function (TransactionType) {
    TransactionType["charge"] = "charge";
    TransactionType["refund"] = "refund";
    TransactionType["deposit"] = "deposit";
    TransactionType["depositReturn"] = "depositReturn";
    TransactionType["breached"] = "breached";
})(TransactionType || (TransactionType = {}));
;
var Asset = /** @class */ (function () {
    function Asset() {
        this.barcode = '';
        this.imei = '';
        this.sim = '';
        this.state = AssetState.inventory;
        this.updatedAt = 0;
        this.createdAt = 0;
        this.location = '';
        this.simActivationDate = 0;
        this.simExpirationDate = 0;
        this.leaseCounter = 0;
        this.contractRef = '';
        this.notes = '';
    }
    return Asset;
}());
function AgentActivityCreate(userEmail, type, createdAt) {
    var agentActivity = {};
    agentActivity.userEmail = userEmail;
    agentActivity.type = type;
    agentActivity.createdAt = createdAt;
    return agentActivity;
}
function createNewContract(id, createdDate, endsAt, agentId) {
    var contract = {};
    contract.id = id;
    contract.createdAt = createdDate;
    contract.updatedAt = createdDate;
    contract.rentalCost = 2688;
    contract.contractType = ContractType.DAILY;
    contract.state = ContractState.active;
    contract.substate = ContractSubstate.draft;
    contract.agentRef = agentId;
    contract.endsAt = endsAt;
    contract.barcode = '';
    return contract;
}
;
function isDAILYContract(contractType) {
    return contractType.toString().toLowerCase() == ContractType.DAILY.toString().toLowerCase();
}
;
function isOVERNIGHTContract(contractType) {
    return contractType.toString().toLowerCase() == ContractType.DAILY.toString().toLowerCase();
}
;
function isWEEKLYContract(contractType) {
    return contractType.toString().toLowerCase() == ContractType.DAILY.toString().toLowerCase();
}
;
function isMONTHLYContract(contractType) {
    return contractType.toString().toLowerCase() == ContractType.DAILY.toString().toLowerCase();
}
;
function isDAILYOrOVERNIGHTContract(contractType) {
    return isDAILYContract(contractType) || isOVERNIGHTContract(contractType);
}
;
function createNewAsset(barcode) {
    var asset = {};
    asset.barcode = barcode;
    return asset;
}
