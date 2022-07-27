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
    status: 'MAINTENANCE' | 'ACTIVE' | 'DISABLED'
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
}
