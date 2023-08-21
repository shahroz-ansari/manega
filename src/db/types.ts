export type QueryCallbackFunction = (i: IDBObjectStore) => IDBRequest

export type DBSchema = {
  dbname: string
  version: number
  stores: {
    name: string
    options?: {
      keyPath: string
      autoIncrement: boolean
    }
    indexes?: {
      name: string
      keyPath: string
      unique: boolean
    }[]
  }[]
}

export interface IdbStoreNewProjectType {
  name: string
}

export interface IdbStoreProjectType extends IdbStoreNewProjectType {
  id: number
}

export interface IdbStoreNewMSAType {
  projectId: number
  from: string
  to: string
  status: string
  created: string
}

export interface IdbStoreMSAType extends IdbStoreNewMSAType {
  id: number
}

export interface IdbStoreNewSOWType {
  projectId: number
  msaId: number
  from: string
  to: string
  status: string
  created: string
}

export interface IdbStoreSOWType extends IdbStoreNewSOWType {
  id: number
}

export interface IdbStoreNewTimesheetType {
  projectId: number
  msaId: number
  year: string
  month: string
  status: string
  type: string
  created: string
}

export interface IdbStoreTimesheetType extends IdbStoreNewTimesheetType {
  id: number
}

export interface IdbStoreNewInvoiceType {
  projectId: number
  msaId: number
  year: string
  month: string
  status: string
  created: string
}

export interface IdbStoreInvoiceType extends IdbStoreNewInvoiceType {
  id: number
}
