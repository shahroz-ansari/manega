import dbConfig from './db.config.json'
import IndexDB from './idb'
import type { QueryCallbackFunction } from './types'

class IndexDBQuery extends IndexDB {
  executeQuery(
    storeName: string,
    queryCallback: QueryCallbackFunction,
    mode: IDBTransactionMode = 'readonly'
  ) {
    return new Promise((resolve, reject) => {
      this.db.then((db) => {
        if (!db) reject(Error('DB not initialized'))
        else {
          const storeInstance = db
            .transaction(storeName, mode)
            .objectStore(storeName)

          const objectRequest: IDBRequest = queryCallback(storeInstance)

          objectRequest.onsuccess = (event: any) => {
            console.log('DB:Q::', storeName, event)
            resolve(objectRequest.result)
          }
          objectRequest.onerror = (error) => {
            reject(error)
          }
        }
      })
    })
  }

  get(storeName: string, key: string | number, index: string = '') {
    return this.executeQuery(storeName, (storeInstance: IDBObjectStore) => {
      let objectRequest: IDBRequest
      if (index) {
        const indexInstance = storeInstance.index(index)
        objectRequest = indexInstance.get(key)
      } else {
        objectRequest = storeInstance.get(key)
      }
      return objectRequest
    })
  }

  getAll(storeName: string, key: string | number = '', index: string = '') {
    return this.executeQuery(storeName, (storeInstance: IDBObjectStore) => {
      let objectRequest: IDBRequest
      if (index) {
        console.log('++', key, index)
        const indexInstance = storeInstance.index(index)
        objectRequest = indexInstance.getAll(key)
      } else {
        objectRequest = key ? storeInstance.getAll(key) : storeInstance.getAll()
      }
      return objectRequest
    })
  }

  add(storeName: string, data: any) {
    return this.executeQuery(
      storeName,
      (storeInstance: IDBObjectStore) => {
        const objectRequest: IDBRequest = storeInstance.add(data)
        return objectRequest
      },
      'readwrite'
    )
  }

  delete(storeName: string, key: string | number) {
    return this.executeQuery(
      storeName,
      (storeInstance: IDBObjectStore) => {
        const objectRequest: IDBRequest = storeInstance.delete(key)
        return objectRequest
      },
      'readwrite'
    )
  }

  update(storeName: string, data: any) {
    return this.executeQuery(
      storeName,
      (storeInstance: IDBObjectStore) => {
        const objectRequest: IDBRequest = storeInstance.put(data)
        return objectRequest
      },
      'readwrite'
    )
  }
}

const idb = new IndexDBQuery(dbConfig)

export default idb
