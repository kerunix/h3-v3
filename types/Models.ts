// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Models {
  interface BaseEntity {
    id: number
    createdAt: string
    deletedAt: string
    updatedAt: string | null
  }

  interface User extends BaseEntity {
    email: string
    username: string
    roles: ('SUPERADMIN' | 'USER' | 'ADMIN')[]
  }

  type DomainStatus = 'MAINTENANCE' | 'ACTIVE' | 'DISABLED'

  interface Provider extends BaseEntity {
    bic: string
    cancelPolicy: 'SOFT' | 'MEDIUM' | 'HARD'
    domains: number[]
    email: string
    files: number[]
    hlcpId: string
    hlcpPassword: string
    iban: string
    id: number
    legalContactBirthDate: string
    legalContactCountryOfResidence: string
    legalContactFirstname: string
    legalContactLastname: string
    legalContactNationality: string
    legalContactTitle: 'MALE' | 'FEMALE' | 'OTHER'
    mybeezboxId: string
    mybeezboxPassword: string
    mybeezboxUrl: string
    name: string
    payoutFrequency: 'WEEKLY' | 'MONTHLY'
    phone: string
    status: DomainStatus
    structureAPENAFCode: string
    structureCompanyName: string
    structureLegalForm: string
    structureRCSNumber: string
    structureStatus: 'COMPANY' | 'INDIVIDUAL'
    unicstayContactAddress: number
    unicstayContactBirthdate: string
    unicstayContactEmail: string
    unicstayContactFirstname: string
    unicstayContactLastname: string
    unicstayContactPhone: string
    unicstayContactTitle: string
    users: number[]
  }

  enum ShortToISOEnum {
    FR = 'fr-FR',
    EN = 'en-US',
    ES = 'es-ES',
    NL = 'nl-NL',
  }

  interface Translation {
    [ShortToISOEnum.FR]: string | null
    [ShortToISOEnum.EN]: string | null
    [ShortToISOEnum.ES]: string | null
    [ShortToISOEnum.NL]: string | null
  }

  interface DomainSecureHolidayData {
    engineId: string
    establishmentId: string
  }

  interface DomainEviivoData {
    ev_shortName: string
  }

  interface DomainKeBookingData {
    propertyId: string
  }

  // Discriminating union type to allow us to enforce strict typings on the `data` property
  type DomainExternalId = {
    platformId: 'SECUREHOLIDAY'
    data: DomainSecureHolidayData
  } | {
    platformId: 'KEBOOKING'
    data: DomainEviivoData
  } | {
    platformId: 'EVIIVO'
    data: DomainKeBookingData
  }

  interface DomainModeratableFields {
    commercialName?: Translation
    title?: Translation
    description?: Translation
    access?: Translation
    around?: Translation
    practicalInfo?: Translation
    openingDetails?: Translation
    checkinTimeDetails?: Translation
    visitDiscoveriesTitle?: Translation
    visitDiscoveriesContent?: Translation
    seoTitle?: Translation
    seoMetaDesc?: Translation
    seoH1?: Translation
    ownersPresentation?: Translation
    ownersWord?: Translation
    managerWord?: Translation
    status?: 'ACTIVE' | 'MAINTENANCE' | 'DISABLED'
    onlineBookingStatus?: 'DISABLED' | 'FORM' | 'ENABLED'
  }
  interface Period {
    start: string
    end: string
  }

  interface Domain extends BaseEntity {
    abcdUrl?: Translation
    access: Translation
    address: number
    around: Translation
    bookingPhone: string
    bookingEmail: string
    cancelScore: number
    checkinTimeDetails: Translation
    checkinTimeEnd: string
    checkinTimeStart: string
    checkoutTimeEnd: string
    checkoutTimeStart: string
    commercialName: Translation
    description: Translation
    domainActivityEntries: number[]
    domainEquipmentEntries: number[]
    domainHealthSafetyMeasures: number[]
    email: string
    externalId: DomainExternalId | null
    files: number[]
    flexibleCheckinTimeEnd: string
    flexibleCheckinTimeStart: string
    flexibleCheckoutTimeEnd: string
    flexibleCheckoutTimeStart: string
    id: number
    isActive: boolean
    isExternal: boolean
    isFlexibleCheckinout: boolean
    isIcalDescriptionEnabled: boolean
    isNoIndex: boolean
    isPublicTransportAccessible: boolean
    isSmsNotificationEnabled: boolean
    managerWord: Translation
    marketplaceConfigurations: number[]
    maxHoursBeforeBooking: number
    minHoursBeforeBooking: number
    maxAgeChild: number | null
    maxAgeInfant: number | null
    moderatedAt: string
    moderationStatus: 'APPROVED' | 'PENDING' | 'DENIED'
    lastApprovedFields: DomainModeratableFields
    name: string
    onlineBookingStatus: 'DISABLED' | 'FORM' | 'ENABLED'
    openingDetails: Translation
    openingPeriods: Period[]
    ownersPresentation: Translation
    ownersWord: Translation
    practicalInfo: Translation
    provider: number
    seoH1: Translation
    seoMetaDesc: Translation
    seoTitle: Translation
    services: number[]
    smsPhone: string
    status: 'ACTIVE' | 'MAINTENANCE' | 'DISABLED'
    title: Translation
    visitsDiscoveriesTitle: Translation
    visitsDiscoveriesContent: Translation
    pendingModeration: DomainModeratableFields
  }
  interface Money {
    amount: number
    currency: 'EUR'
    sign?: { prefix: string; suffix: string }
  }

  interface TaxableMoney extends Money {
    taxrate: number
  }
  interface BookingCharge {
    serviceCharge: TaxableMoney
    serviceChargeWithDiscounts: TaxableMoney
    serviceDiscountAmount: Money
    optionCharges: number[]
    totalCharge: TaxableMoney
    totalChargeWithDiscounts: TaxableMoney
    promocodeDiscount: Money
    totalChargeWithDiscountsAndPromocodes: TaxableMoney
  }
  interface BookingGiftCard {
    giftCard: number
    amount: Money
  }
  interface BookingDiscount {
    discountType: 'BOOKING_GLOBAL' | 'BOOKING_SERVICE'
    currency: 'EUR'
    amount?: number
    percent?: number
  }

  interface Booking extends BaseEntity {
    adultsNumber: number
    bookingCharge?: BookingCharge
    bookingGiftCards: BookingGiftCard[]
    cart: number
    childrenNumber: number
    customer: number
    discounts: BookingDiscount[]
    domain: number
    end: string
    giftCardSpendings: number[]
    guests: BookingGuest[]
    hostMessage: string | null
    id: number
    infantsNumber: number
    marketplace: number
    options: BookingOption[]
    payments: number[]
    promocodes: number[]
    provider: number
    service: number
    serviceUnit: number
    start: string
    status:
    'BOOKING_CANCELLED_CUSTOMER' |
    'BOOKING_CANCELLED_PROVIDER' |
    'BOOKING_CANCELLED_SYSTEM' |
    'BOOKING_CONFIRMED' |
    'BOOKING_STANDBY' |
    'BOOKING_CLOSED' |
    'FAILED' |
    'CANCELLED' |
    'SUCCESS'
    totalPersons: number
    thirdPartyData: ThirdPartyData | null
  }
  interface BookingGuest {
    dateOfBirth: string
    idx: number
    firstName?: string
    lastName?: string
  }
  interface BookingOption {
    option: number
    quantity: number
  }

  interface ThirdPartyData {
    gender: 'MALE' | 'FEMALE' | 'OTHER'
    firstName: string
    lastName: string
    isNotificationReceiver: boolean
    contactEmail: string | null
    phoneNumber: string | null
  }
}

