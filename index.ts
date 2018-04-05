enum BillState {
    unpaid = "unpaid",
    paid = "paid"
};

enum AssetActionDefinition {
    checkin = 'checkin',
    checkout = 'checkout'
};

enum AssetState {
    inventory = 'Inventory',
    leased = 'Leased',
    missing = 'Missing',
    nonreturn = 'Nonreturn',
    damaged = 'Damaged'
};


enum CustomerFaultReason {
    waterDamage = 'Water Damage',
    physicalDamage = 'Physical Damage',
    unitTamperApparent = 'Unit tamper apparent',
    simCardRemoved = 'Sim Card Removed',
    screenBroken = 'Screen Broken',
    unitHardReset = 'Unit Hard Reset',
    other = 'Other'
};


enum AgentActivityType {
    login = "login",
    logout = "logout",
    assetCheckin = "assetCheckin",
    assetCheckout = "assetCheckout"
};


enum ContractType {
    DAILY = "DAILY",
    OVERNIGHT = "OVERNIGHT",
    MULTIPLE_DAYS = "MULTIPLE_DAYS",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    QUICK_CONNECT = "QUICK_CONNECT"
};

enum ContractState {
    draft = 100,
    active = 200,
    complete = 300,
    breached = 400
};

enum ContractSubstate {
    draft = "Draft",
    signed = "Signed",
    paymentProcessed = "Payment Processed",
    active = "Active",
    complete = "Complete",
    breached = "Breached",
    archived = "Archived"
};

enum StoreLocationRegion {
    FREEPORT = 'FREEPORT',
    NASSAU = 'NASSAU',
};

enum StoreLocationConfigKeys {
    PRICE_MODIFIER = 'PRICE_MODIFIER',
    CONTRACT_TYPES_ALLOWED = 'CONTRACT_TYPES_ALLOWED',
};


enum PaymentMethod {
    card = "card",
    cash = "cash"
};

enum TransactionType {
    charge = "charge",
    refund = "refund",
    deposit = 'deposit',
    depositReturn = 'depositReturn',
    breached = 'breached'
};

interface Roles {
    reader: boolean;
    agent?: boolean;
    manager?: boolean;
    admin?: boolean;

}

interface User {
    id: string;
    email: string;
    roles: Roles;

    firstName?: string;
    lastName?: string;
    phone?: string;
    photoURL?: string;

}

interface Transaction {
    id: string;
    stripeId: string;
    customerRef: string;
    contractRef: string;
    source: string;
    transactionRef: string;

    paymentMethod: string;
    amount: number;

    type: TransactionType;
    refundForPaymentId: string;

    createdAt: number;
    updatedAt: number;

    isRefundable: boolean;
    isRefunded: boolean;
    error: {};
}

interface StripeSubscription {
    id: string;
    customerRef: string;
    contractRef: string;
    source: string;
    transactionRef: string;

    amount: number;

    refundForPaymentId: string;

    createdAt: number;
    updatedAt: number;

    isCancelled: boolean;
    error: {};
}

interface StripePaymentSource {
    id: string;
    token: string;
}

interface ContractEntitlement {
    active: boolean;
    contractType: ContractType;
    priceModifier: number;
}

interface StoreLocation {
    id: string;
    region: string;
    name: string;
    latitude: number;
    longitude: number;
    changed: boolean;
    entitlements: ContractEntitlement[];
    /*freeportHarbor='freeportHarbor',
    freeportBahamasAdventures='freeportBahamasAdventures',
    freeportGetMeRide='freeportGetMeRide',
    freeportZorbas='freeportZorbas',*/

}

interface Refund {
    id: string;
    amount: number;
    createdAt: number;
    description: string;
}

interface QueryConfig {
    path: string, //  path to collection
    field: string, // field to orderBy
    limit: number, // limit per query
    reverse: boolean, // reverse order?
    prepend: boolean // prepend to source?
}

class Asset {
    barcode: string = '';
    imei: string = '';
    sim: string = '';
    state: AssetState = AssetState.inventory;
    updatedAt: number = 0;
    createdAt: number = 0;
    location: string = '';
    simActivationDate: number = 0;
    simExpirationDate: number = 0;
    leaseCounter: number = 0;
    contractRef: string = '';
    notes: string = '';
}

interface Customer {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
}


declare class Contract {
    id: string;
    signatureData: string;

    displayName: string;
    location: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: number;
    updatedAt: number;
    endsAt: number;

    rentalCost: number;
    liabilityAmount: number;
    paymentMethod: string;
    stripePaymentSource: string;
    stripePaymentSourceRef: string;
    subscriptionActive: boolean;

    contractType: ContractType;
    state: ContractState;
    substate: ContractSubstate;
    depositRequired: boolean;

    customerRef: string;
    barcode: string;
    agentRef: string;
    agentDisplayName: string;
    managerRef: string;
    source: string;
    stripeCustomerRef: string;
    notes: string;
    hide?: boolean;
}

interface CardInfo {

    number: string;
    exp_month: string;
    exp_year: string;
    address_zip: string;
}


interface Bill {
    id: string;
    amountDue: number;
    state: string;
    dueDate: number;
    depositRequired: boolean;
    createdAt: number;
    description: string;
}


interface AssetActivity {
    barcode: string;
    activityTime: number;
    action: string;
    isAssetConditionSatisfactory: boolean;
    isCustomerAtFault: boolean;
    customerFaultReason: CustomerFaultReason;
    customerFaultOtherText: string;
    contractRef: string;
    agentRef: string;
    location: string;
}


interface AgentActivity {
    userEmail: string;
    type: AgentActivityType;
    createdAt: number;
}



function AgentActivityCreate(userEmail: string, type: AgentActivityType, createdAt: number) {
    var agentActivity = {} as AgentActivity;
    agentActivity.userEmail = userEmail;
    agentActivity.type = type;
    agentActivity.createdAt = createdAt;
    return agentActivity;
}


function createNewContract(id: string, createdDate: number, endsAt: number, agentId: string) {
    var contract = {} as Contract;
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
};


function isDAILYContract(contractType: ContractType) {
    return contractType == ContractType.DAILY;
};

function isOVERNIGHTContract(contractType: ContractType) {
    return contractType == ContractType.DAILY;
};

function isWEEKLYContract(contractType: ContractType) {
    return contractType == ContractType.DAILY;
};

function isMONTHLYContract(contractType: ContractType) {
    return contractType == ContractType.DAILY;
};

function isDAILYOrOVERNIGHTContract(contractType: ContractType) {
    return isDAILYContract(contractType) || isOVERNIGHTContract(contractType);
};

function createNewAsset(barcode: string) {
    var asset = {} as Asset;
    asset.barcode = barcode;
    return asset;
}