import idb from '@/db'
import { storeNames } from '@/db/constants'
import type {
  IdbStoreNewMSAType,
  IdbStoreNewProjectType,
  IdbStoreNewSOWType,
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
