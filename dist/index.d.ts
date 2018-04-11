export declare module iwlib {
    enum BillState {
        unpaid = "unpaid",
        paid = "paid",
    }
    enum AssetActionDefinition {
        checkin = "checkin",
        checkout = "checkout",
    }
    enum AssetState {
        inventory = "Inventory",
        leased = "Leased",
        missing = "Missing",
        nonreturn = "Nonreturn",
        damaged = "Damaged",
    }
    enum CustomerFaultReason {
        waterDamage = "Water Damage",
        physicalDamage = "Physical Damage",
        unitTamperApparent = "Unit tamper apparent",
        simCardRemoved = "Sim Card Removed",
        screenBroken = "Screen Broken",
        unitHardReset = "Unit Hard Reset",
        other = "Other",
    }
    enum AgentActivityType {
        login = "login",
        logout = "logout",
        assetCheckin = "assetCheckin",
        assetCheckout = "assetCheckout",
    }
    enum ContractType {
        DAILY = "DAILY",
        OVERNIGHT = "OVERNIGHT",
        MULTIPLE_DAYS = "MULTIPLE_DAYS",
        WEEKLY = "WEEKLY",
        MONTHLY = "MONTHLY",
        QUICK_CONNECT = "QUICK_CONNECT",
        BUSINESS = "BUSINESS",
    }
    enum ContractState {
        draft = 100,
        active = 200,
        complete = 300,
        breached = 400,
    }
    enum ContractSubstate {
        draft = "Draft",
        signed = "Signed",
        paymentProcessed = "Payment Processed",
        active = "Active",
        complete = "Complete",
        breached = "Breached",
        archived = "Archived",
    }
    enum StoreLocationRegion {
        FREEPORT = "FREEPORT",
        NASSAU = "NASSAU",
    }
    enum StoreLocationConfigKeys {
        PRICE_MODIFIER = "PRICE_MODIFIER",
        CONTRACT_TYPES_ALLOWED = "CONTRACT_TYPES_ALLOWED",
    }
    enum PaymentMethod {
        card = "card",
        cash = "cash",
    }
    enum TransactionType {
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
        customer?: boolean;
        developer?: boolean;
        tester?: boolean;
    }
    interface DbRecord {
        createdAt?: number;
        createdAtDate?: Date;
        updatedAt?: number;
        updatedAtDate?: Date;
    }
    interface User extends DbRecord {
        id: string;
        email: string;
        roles: Roles;
        firstName?: string;
        lastName?: string;
        phone?: string;
        photoURL?: string;
    }
    interface Transaction extends DbRecord {
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
        isRefundable: boolean;
        isRefunded: boolean;
        error: {};
    }
    interface StripeSubscription extends DbRecord {
        id: string;
        customerRef: string;
        contractRef: string;
        source: string;
        transactionRef: string;
        amount: number;
        refundForPaymentId: string;
        isCancelled: boolean;
        error: {};
    }
    interface StripePaymentSource extends DbRecord {
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
    interface Refund extends DbRecord {
        id: string;
        amount: number;
        description: string;
    }
    interface QueryConfig {
        path: string;
        field: string;
        limit: number;
        reverse: boolean;
        prepend: boolean;
    }
    interface Customer extends DbRecord {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        fullName: string;
        phone: string;
    }
    interface CardInfo {
        number: string;
        exp_month: string;
        exp_year: string;
        address_zip: string;
    }
    interface Bill extends DbRecord {
        id: string;
        amountDue: number;
        state: string;
        dueDate: number;
        depositRequired: boolean;
        description: string;
    }
    interface AssetActivity extends DbRecord {
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
    interface AgentActivity extends DbRecord {
        userEmail: string;
        type: AgentActivityType;
    }
    class Asset implements DbRecord {
        barcode: string;
        imei: string;
        sim: string;
        state: AssetState;
        location: string;
        simActivationDate: number;
        simExpirationDate: number;
        leaseCounter: number;
        contractRef: string;
        notes: string;
        updatedAt: number;
        createdAt: number;
        updatedAtDate: Date;
        createdAtDate: Date;
    }
    class Contract implements DbRecord {
        id: string;
        signatureData: string;
        displayName: string;
        location: string;
        firstName: string;
        lastName: string;
        email: string;
        endsAt: number;
        rentalCost: number;
        liabilityAmount: number;
        paymentMethod?: PaymentMethod;
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
        assetsAllotted: number;
        updatedAt: number;
        createdAt: number;
        updatedAtDate: Date;
        createdAtDate: Date;
    }
    function AgentActivityCreate(userEmail: string, type: AgentActivityType, createdAt: number): AgentActivity;
    function createNewContract(id: string, createdDate: number, endsAt: number, agentId: string): Contract;
    function isDAILYContract(contractType: ContractType): boolean;
    function isOVERNIGHTContract(contractType: ContractType): boolean;
    function isWEEKLYContract(contractType: ContractType): boolean;
    function isMONTHLYContract(contractType: ContractType): boolean;
    function isDAILYOrOVERNIGHTContract(contractType: ContractType): boolean;
    function createNewAsset(barcode: string): Asset;
}
