// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Models {
  interface BaseEntity {
    id: number
  }

  interface User extends BaseEntity {
    email: string
    username: string
    roles: ('SUPERADMIN' | 'USER' | 'ADMIN')[]
  }
}
