"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iwlib;
(function (iwlib) {
    var BillState;
    (function (BillState) {
        BillState["unpaid"] = "unpaid";
        BillState["paid"] = "paid";
    })(BillState = iwlib.BillState || (iwlib.BillState = {}));
    ;
    var AssetActionDefinition;
    (function (AssetActionDefinition) {
        AssetActionDefinition["checkin"] = "checkin";
        AssetActionDefinition["checkout"] = "checkout";
    })(AssetActionDefinition = iwlib.AssetActionDefinition || (iwlib.AssetActionDefinition = {}));
    ;
    var AssetState;
    (function (AssetState) {
        AssetState["inventory"] = "Inventory";
        AssetState["leased"] = "Leased";
        AssetState["missing"] = "Missing";
        AssetState["nonreturn"] = "Nonreturn";
        AssetState["damaged"] = "Damaged";
    })(AssetState = iwlib.AssetState || (iwlib.AssetState = {}));
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
    })(CustomerFaultReason = iwlib.CustomerFaultReason || (iwlib.CustomerFaultReason = {}));
    ;
    var AgentActivityType;
    (function (AgentActivityType) {
        AgentActivityType["login"] = "login";
        AgentActivityType["logout"] = "logout";
        AgentActivityType["assetCheckin"] = "assetCheckin";
        AgentActivityType["assetCheckout"] = "assetCheckout";
    })(AgentActivityType = iwlib.AgentActivityType || (iwlib.AgentActivityType = {}));
    ;
    var ContractType;
    (function (ContractType) {
        ContractType["DAILY"] = "DAILY";
        ContractType["OVERNIGHT"] = "OVERNIGHT";
        ContractType["MULTIPLE_DAYS"] = "MULTIPLE_DAYS";
        ContractType["WEEKLY"] = "WEEKLY";
        ContractType["MONTHLY"] = "MONTHLY";
        ContractType["QUICK_CONNECT"] = "QUICK_CONNECT";
        ContractType["BUSINESS"] = "BUSINESS";
    })(ContractType = iwlib.ContractType || (iwlib.ContractType = {}));
    ;
    var ContractState;
    (function (ContractState) {
        ContractState[ContractState["draft"] = 100] = "draft";
        ContractState[ContractState["active"] = 200] = "active";
        ContractState[ContractState["complete"] = 300] = "complete";
        ContractState[ContractState["breached"] = 400] = "breached";
    })(ContractState = iwlib.ContractState || (iwlib.ContractState = {}));
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
    })(ContractSubstate = iwlib.ContractSubstate || (iwlib.ContractSubstate = {}));
    ;
    var StoreLocationRegion;
    (function (StoreLocationRegion) {
        StoreLocationRegion["FREEPORT"] = "FREEPORT";
        StoreLocationRegion["NASSAU"] = "NASSAU";
    })(StoreLocationRegion = iwlib.StoreLocationRegion || (iwlib.StoreLocationRegion = {}));
    ;
    var StoreLocationConfigKeys;
    (function (StoreLocationConfigKeys) {
        StoreLocationConfigKeys["PRICE_MODIFIER"] = "PRICE_MODIFIER";
        StoreLocationConfigKeys["CONTRACT_TYPES_ALLOWED"] = "CONTRACT_TYPES_ALLOWED";
    })(StoreLocationConfigKeys = iwlib.StoreLocationConfigKeys || (iwlib.StoreLocationConfigKeys = {}));
    ;
    var PaymentMethod;
    (function (PaymentMethod) {
        PaymentMethod["card"] = "card";
        PaymentMethod["cash"] = "cash";
    })(PaymentMethod = iwlib.PaymentMethod || (iwlib.PaymentMethod = {}));
    ;
    var TransactionType;
    (function (TransactionType) {
        TransactionType["charge"] = "charge";
        TransactionType["refund"] = "refund";
        TransactionType["deposit"] = "deposit";
        TransactionType["depositReturn"] = "depositReturn";
        TransactionType["breached"] = "breached";
    })(TransactionType = iwlib.TransactionType || (iwlib.TransactionType = {}));
    ;
    var RolesTable = /** @class */ (function () {
        function RolesTable() {
        }
        return RolesTable;
    }());
    iwlib.RolesTable = RolesTable;
    var Asset = /** @class */ (function () {
        function Asset() {
            this.barcode = '';
            this.imei = '';
            this.sim = '';
            this.state = AssetState.inventory;
            this.location = '';
            this.simActivationDate = 0;
            this.simExpirationDate = 0;
            this.leaseCounter = 0;
            this.contractRef = '';
            this.notes = '';
            this.updatedAt = 0;
            this.createdAt = 0;
            this.updatedAtDate = new Date();
            this.createdAtDate = new Date();
        }
        return Asset;
    }());
    iwlib.Asset = Asset;
    var Contract = /** @class */ (function () {
        function Contract() {
            this.id = '';
            this.signatureData = '';
            this.displayName = '';
            this.location = '';
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.endsAt = 0;
            this.rentalCost = 0;
            this.liabilityAmount = 0;
            this.stripePaymentSource = '';
            this.stripePaymentSourceRef = '';
            this.subscriptionActive = false;
            this.contractType = ContractType.DAILY;
            this.state = ContractState.draft;
            this.substate = ContractSubstate.draft;
            this.depositRequired = false;
            this.customerRef = '';
            this.barcode = '';
            this.agentRef = '';
            this.agentDisplayName = '';
            this.managerRef = '';
            this.source = '';
            this.stripeCustomerRef = '';
            this.notes = '';
            this.assetsAllotted = 1;
            this.updatedAt = 0;
            this.createdAt = 0;
            this.updatedAtDate = new Date();
            this.createdAtDate = new Date();
        }
        return Contract;
    }());
    iwlib.Contract = Contract;
    function AgentActivityCreate(userEmail, type, createdAt) {
        var agentActivity = {};
        agentActivity.userEmail = userEmail;
        agentActivity.type = type;
        agentActivity.createdAt = createdAt;
        return agentActivity;
    }
    iwlib.AgentActivityCreate = AgentActivityCreate;
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
    iwlib.createNewContract = createNewContract;
    ;
    function isDAILYContract(contractType) {
        return contractType == ContractType.DAILY;
    }
    iwlib.isDAILYContract = isDAILYContract;
    ;
    function isOVERNIGHTContract(contractType) {
        return contractType == ContractType.DAILY;
    }
    iwlib.isOVERNIGHTContract = isOVERNIGHTContract;
    ;
    function isWEEKLYContract(contractType) {
        return contractType == ContractType.DAILY;
    }
    iwlib.isWEEKLYContract = isWEEKLYContract;
    ;
    function isMONTHLYContract(contractType) {
        return contractType == ContractType.DAILY;
    }
    iwlib.isMONTHLYContract = isMONTHLYContract;
    ;
    function isDAILYOrOVERNIGHTContract(contractType) {
        return isDAILYContract(contractType) || isOVERNIGHTContract(contractType);
    }
    iwlib.isDAILYOrOVERNIGHTContract = isDAILYOrOVERNIGHTContract;
    ;
    function createNewAsset(barcode) {
        var asset = {};
        asset.barcode = barcode;
        return asset;
    }
    iwlib.createNewAsset = createNewAsset;
})(iwlib = exports.iwlib || (exports.iwlib = {}));
