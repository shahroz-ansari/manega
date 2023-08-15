import type { DBSchema } from './types'

class IndexDB {
  db: Promise<IDBDatabase | null>

  constructor(config: DBSchema) {
    this.db = IndexDB.initialize(config)
  }

  private static updateDBSchema(connection: IDBDatabase, config: DBSchema) {
    // loop store required for project
    config.stores.forEach((store) => {
      const storeInstance: IDBObjectStore =
        connection.objectStoreNames.contains(store.name)
          ? connection
              .transaction(store.name, 'readwrite')
              .objectStore(store.name)
          : connection.createObjectStore(store.name, store.options)

      const existingIndexes = storeInstance.indexNames
      // loop indexes required for store
      store.indexes?.forEach((index) => {
        // check if index already exists
        if (!existingIndexes.contains(index.name))
          storeInstance.createIndex(index.name, index.keyPath, {
            unique: index.unique,
          })
      })
    })
  }

  private static initialize(config: DBSchema): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined') return Promise.resolve(null)

    return new Promise((resolve, reject) => {
      // open a connection instance to db
      const instance = window.indexedDB.open(config.dbname, config.version)
      instance.onsuccess = () => {
        console.log('DB: connection 1')
        resolve(instance.result)
      }
      instance.onupgradeneeded = () => {
        console.log('DB: upgrading store')
        // db connection instance
        const connection: IDBDatabase = instance.result

        IndexDB.updateDBSchema(connection, config)
      }
      instance.onerror = (e) => {
        console.log('DB: connection 0')
        reject(e)
      }
    })
  }
}

export default IndexDB
