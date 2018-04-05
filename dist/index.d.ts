declare enum BillState {
    unpaid = "unpaid",
    paid = "paid",
}
declare enum AssetActionDefinition {
    checkin = "checkin",
    checkout = "checkout",
}
declare enum AssetState {
    inventory = "Inventory",
    leased = "Leased",
    missing = "Missing",
    nonreturn = "Nonreturn",
    damaged = "Damaged",
}
declare enum CustomerFaultReason {
    waterDamage = "Water Damage",
    physicalDamage = "Physical Damage",
    unitTamperApparent = "Unit tamper apparent",
    simCardRemoved = "Sim Card Removed",
    screenBroken = "Screen Broken",
    unitHardReset = "Unit Hard Reset",
    other = "Other",
}
declare enum AgentActivityType {
    login = "login",
    logout = "logout",
    assetCheckin = "assetCheckin",
    assetCheckout = "assetCheckout",
}
declare enum ContractType {
    DAILY = "DAILY",
    OVERNIGHT = "OVERNIGHT",
    MULTIPLE_DAYS = "MULTIPLE_DAYS",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    QUICK_CONNECT = "QUICK_CONNECT",
}
declare enum ContractState {
    draft = 100,
    active = 200,
    complete = 300,
    breached = 400,
}
declare enum ContractSubstate {
    draft = "Draft",
    signed = "Signed",
    paymentProcessed = "Payment Processed",
    active = "Active",
    complete = "Complete",
    breached = "Breached",
    archived = "Archived",
}
declare enum StoreLocationRegion {
    FREEPORT = "FREEPORT",
    NASSAU = "NASSAU",
}
declare enum StoreLocationConfigKeys {
    PRICE_MODIFIER = "PRICE_MODIFIER",
    CONTRACT_TYPES_ALLOWED = "CONTRACT_TYPES_ALLOWED",
}
declare enum PaymentMethod {
    card = "card",
    cash = "cash",
}
declare enum TransactionType {
    charge = "charge",
    refund = "refund",
    deposit = "deposit",
    depositReturn = "depositReturn",
    breached = "breached",
}
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
}
interface Refund {
    id: string;
    amount: number;
    createdAt: number;
    description: string;
}
interface QueryConfig {
    path: string;
    field: string;
    limit: number;
    reverse: boolean;
    prepend: boolean;
}
declare class Asset {
    barcode: string;
    imei: string;
    sim: string;
    state: AssetState;
    updatedAt: number;
    createdAt: number;
    location: string;
    simActivationDate: number;
    simExpirationDate: number;
    leaseCounter: number;
    contractRef: string;
    notes: string;
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
declare function AgentActivityCreate(userEmail: string, type: AgentActivityType, createdAt: number): AgentActivity;
declare function createNewContract(id: string, createdDate: number, endsAt: number, agentId: string): Contract;
declare function isDAILYContract(contractType: ContractType): boolean;
declare function isOVERNIGHTContract(contractType: ContractType): boolean;
declare function isWEEKLYContract(contractType: ContractType): boolean;
declare function isMONTHLYContract(contractType: ContractType): boolean;
declare function isDAILYOrOVERNIGHTContract(contractType: ContractType): boolean;
declare function createNewAsset(barcode: string): Asset;
