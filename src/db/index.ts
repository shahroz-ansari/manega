import dbConfig from './db.config.json'

class IndexDB {
  db: any;
  constructor(config:any) {
    this.db = this.initialize(config)
  }

  initialize(config: any) {
    if(typeof window === 'undefined') return Promise.resolve(null);

    return new Promise((resolve, reject) => {
      const instance = window.indexedDB.open(config.dbname, config.version);
      instance.onsuccess = (ev:any) => {
        console.log('DB: connection 1')
        resolve(ev.target.result);
      }
      instance.onupgradeneeded = (event:any) => {
        console.log('DB: upgrading store')
        const connection = event.currentTarget.result;
        config.stores.map((store:any) => {
          const storeInstance = connection.createObjectStore(
            store.name,
            store.options
          )
          store.indexes.map((index:any) => storeInstance.createIndex(index[0], index[1], index[2]))
          
        })
      }
      instance.onerror = (e) => {
        console.log('DB: connection 0')
        reject(e);
      }
    })
  }
}
const dbConnection = new IndexDB(dbConfig)

export default dbConnection