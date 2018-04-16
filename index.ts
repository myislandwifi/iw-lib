export module iwlib {

    export enum BillState {
        unpaid = "unpaid",
        paid = "paid"
    };
    
    export enum AssetActionDefinition {
        checkin = 'checkin',
        checkout = 'checkout'
    };
    
    export enum AssetState {
        inventory = 'Inventory',
        leased = 'Leased',
        missing = 'Missing',
        nonreturn = 'Nonreturn',
        damaged = 'Damaged',
        sold = 'Sold'
    };
    
    
    export enum CustomerFaultReason {
        waterDamage = 'Water Damage',
        physicalDamage = 'Physical Damage',
        unitTamperApparent = 'Unit tamper apparent',
        simCardRemoved = 'Sim Card Removed',
        screenBroken = 'Screen Broken',
        unitHardReset = 'Unit Hard Reset',
        other = 'Other',
        none = 'None'
    };
    
    
    export enum AgentActivityType {
        login = "login",
        logout = "logout",
        assetCheckin = "assetCheckin",
        assetCheckout = "assetCheckout"
    };
    
    
    export enum ContractType {
        DAILY = "DAILY",
        OVERNIGHT = "OVERNIGHT",
        MULTIPLE_DAYS = "MULTIPLE_DAYS",
        WEEKLY = "WEEKLY",
        MONTHLY = "MONTHLY",
        QUICK_CONNECT = "QUICK_CONNECT",
        BUSINESS = "BUSINESS"
    };
    
    export enum ContractState {
        draft = 100,
        active = 200,
        complete = 300,
        breached = 400
    };
    
    export enum ContractSubstate {
        draft = "DRAFT",
        signed = "SIGNED",
        paymentProcessed = "PAYMENT PROCESSED",
        active = "ACTIVE",
        complete = "COMPLETE",
        breached = "BREACHED",
        archived = "ARCHIVED",
        resolved = "RESOLVED"
    };
    
    export enum StoreLocationRegion {
        FREEPORT = 'FREEPORT',
        NASSAU = 'NASSAU',
    };
    
    export enum StoreLocationConfigKeys {
        PRICE_MODIFIER = 'PRICE_MODIFIER',
        CONTRACT_TYPES_ALLOWED = 'CONTRACT_TYPES_ALLOWED',
    };
    
    
    export enum PaymentMethod {
        card = "CARD",
        cash = "CASH",
        invoice = "INVOICE"
    };
    
    export enum TransactionType {
        charge = "charge",
        refund = "refund",
        deposit = 'deposit',
        depositReturn = 'depositReturn',
        breached = 'breached'
    };
    
    export interface Roles {
        reader?: boolean;
        agent?: boolean;
        manager?: boolean;
        admin?: boolean;
        customer?: boolean;
        developer?: boolean;
        tester?: boolean;
    }
    export class RolesTable implements Roles{
    }

    export interface DbRecord {
        createdAt?:number;
        createdAtDate?:Date;
        updatedAt?: number;
        updatedAtDate?: Date;
    }
    
    export interface User extends DbRecord {
        id: string;
        email: string;
        roles: Roles;
    
        firstName?: string;
        lastName?: string;
        fullName?: string;
        phone?: string;
        photoURL?: string;
    
    }
    
    export interface Transaction extends DbRecord {
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
    
    export interface StripeSubscription extends DbRecord {
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
    
    export interface StripePaymentSource extends DbRecord {
        id: string;
        token: string;
    }
    
    export interface ContractEntitlement {
        active: boolean;
        contractType: ContractType;
        priceModifier: number;
    }
    
    export interface StoreLocation {
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
    
    export interface Refund extends DbRecord {
        id: string;
        amount: number;
        description: string;
    }
    
    export interface QueryConfig {
        path: string, //  path to collection
        field: string, // field to orderBy
        limit: number, // limit per query
        reverse: boolean, // reverse order?
        prepend: boolean // prepend to source?
    }
    
    export interface Customer extends DbRecord {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        fullName: string;
        phone: string;
        address: string;
    }
    
    export interface CardInfo {
    
        number: string;
        exp_month: string;
        exp_year: string;
        address_zip: string;
    }
    
    
    export interface Bill extends DbRecord {
        id: string;
        amountDue: number;
        state: string;
        dueDate: number;
        depositRequired: boolean;
        description: string;
    }
    
    
    export interface AssetActivity extends DbRecord {
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
    
    
    export interface AgentActivity extends DbRecord {
        userEmail: string;
        type: AgentActivityType;
    }
    
    export class Asset implements DbRecord {
        barcode: string = '';
        imei: string = '';
        sim: string = '';
        simActive: boolean = true;
        state: AssetState = AssetState.inventory;
        location: string = '';
        simActivationDate: number = 0;
        simExpirationDate: number = 0;
        leaseCounter: number = 0;
        contractRef: string = '';
        notes: string = '';
        updatedAt: number = 0;
        createdAt: number = 0;
        updatedAtDate: Date = new Date();
        createdAtDate: Date = new Date();
    }
    
    
    export class Contract implements DbRecord {
        id: string = '';
        signatureData: string = '';
    
        displayName: string = '';
        location: string = '';
        firstName: string = '';
        lastName: string = '';
        email: string = '';
        endsAt: number = 0;
    
        rentalCost: number = 0;
        liabilityAmount: number = 0;
        paymentMethod?: PaymentMethod;
        stripePaymentSource: string = '';
        stripePaymentSourceRef: string = '';
        subscriptionActive: boolean = false;
    
        contractType: ContractType = ContractType.DAILY;
        state: ContractState = ContractState.draft;
        substate: ContractSubstate = ContractSubstate.draft;
        depositRequired: boolean = false;
    
        customerRef: string = '';
        barcode: string = '';
        agentRef: string = '';
        agentDisplayName: string = '';
        managerRef: string = '';
        source: string = '';
        stripeCustomerRef: string = '';
        notes: string = '';
        hide?: boolean;

        assetsAllotted:number = 1 ;
        address:string = '';

        updatedAt: number = 0;
        createdAt: number = 0;
        updatedAtDate: Date = new Date();
        createdAtDate: Date = new Date();
        endsAtDate: Date = new Date();
    }
    
    
    
    export function AgentActivityCreate(userEmail: string, type: AgentActivityType, createdAt: number) {
        var agentActivity = {} as AgentActivity;
        agentActivity.userEmail = userEmail;
        agentActivity.type = type;
        agentActivity.createdAt = createdAt;
        return agentActivity;
    }
    
    
    export function createNewContract(id: string, createdDate: number, endsAt: number, agentId: string) {
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
    
    
    export function isDAILYContract(contractType: ContractType) {
        return contractType == ContractType.DAILY;
    };
    
    export function isOVERNIGHTContract(contractType: ContractType) {
        return contractType == ContractType.DAILY;
    };
    
    export function isWEEKLYContract(contractType: ContractType) {
        return contractType == ContractType.DAILY;
    };
    
    export function isMONTHLYContract(contractType: ContractType) {
        return contractType == ContractType.DAILY;
    };
    
    export function isDAILYOrOVERNIGHTContract(contractType: ContractType) {
        return isDAILYContract(contractType) || isOVERNIGHTContract(contractType);
    };
    
    export function createNewAsset(barcode: string) {
        var asset = {} as Asset;
        asset.barcode = barcode;
        return asset;
    }
    }
    