import idb from '@/db'
import { storeNames } from '@/db/constants'
import type {
  IdbStoreNewInvoiceType,
  IdbStoreNewMSAType,
  IdbStoreNewProjectType,
  IdbStoreNewSOWType,
  IdbStoreNewTimesheetType,
} from '@/db/types'

export const getProjectList = async () => {
  return idb.getAll(storeNames.projects)
}

export const addNewProject = async (data: IdbStoreNewProjectType) => {
  return idb.add(storeNames.projects, data)
}

export const getProjectById = async (key: number) => {
  return idb.get(storeNames.projects, key)
}

export const updateProject = async (data: IdbStoreNewProjectType) => {
  return idb.update(storeNames.projects, data)
}

export const getMSAList = async () => {
  return idb.getAll(storeNames.msa)
}

export const addNewMSA = async (data: IdbStoreNewMSAType) => {
  return idb.add(storeNames.msa, data)
}

export const getMSAById = async (key: number) => {
  return idb.get(storeNames.msa, key)
}

export const updateMSA = async (data: IdbStoreNewMSAType) => {
  return idb.update(storeNames.msa, data)
}

export const getMSAsByProjectId = async (projectId: number) => {
  return idb.getAll(storeNames.msa, projectId, 'projectId')
}

export const getSOWList = async () => {
  return idb.getAll(storeNames.sow)
}

export const addNewSOW = async (data: IdbStoreNewSOWType) => {
  return idb.add(storeNames.sow, data)
}

export const getSOWById = async (key: number) => {
  return idb.get(storeNames.sow, key)
}

export const updateSOW = async (data: IdbStoreNewSOWType) => {
  return idb.update(storeNames.sow, data)
}

export const getSOWsByProjectId = async (projectId: number) => {
  return idb.getAll(storeNames.sow, projectId, 'projectId')
}

export const getTimesheetList = async () => {
  return idb.getAll(storeNames.timesheet)
}

export const addNewTimesheet = async (data: IdbStoreNewTimesheetType) => {
  return idb.add(storeNames.timesheet, data)
}

export const getTimesheetById = async (key: number) => {
  return idb.get(storeNames.timesheet, key)
}

export const updateTimesheet = async (data: IdbStoreNewTimesheetType) => {
  return idb.update(storeNames.timesheet, data)
}

export const getTimesheetsByProjectId = async (projectId: number) => {
  return idb.getAll(storeNames.timesheet, projectId, 'projectId')
}

export const getInvoiceList = async () => {
  return idb.getAll(storeNames.invoice)
}

export const addNewInvoice = async (data: IdbStoreNewInvoiceType) => {
  return idb.add(storeNames.invoice, data)
}

export const getInvoiceById = async (key: number) => {
  return idb.get(storeNames.invoice, key)
}

export const updateInvoice = async (data: IdbStoreNewInvoiceType) => {
  return idb.update(storeNames.invoice, data)
}

export const getInvoicesByProjectId = async (projectId: number) => {
  return idb.getAll(storeNames.invoice, projectId, 'projectId')
}
