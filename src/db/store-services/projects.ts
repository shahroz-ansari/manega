import dbConnection from ".."

export const getProjectList = function():any {
  return new Promise((resolve, reject) => {
    dbConnection.db.then((instance:any) => {
      const tx = instance.transaction(['projects'], "readwrite")
      const storeRef = tx.objectStore('projects')

      const getProjects = storeRef.getAll()

      getProjects.onsuccess = function(event:any) {
        if (event.target.result === undefined) {
          reject(`DB: [read] projects not found`);
        } else {
          resolve(event.target.result);
        }
      }

      getProjects.onerror = function(error:any) {
        reject(error)
      }

      
    })
  })
}

export const addProject = function (data: {name: string}) {
  return new Promise((resolve, reject) => {
    dbConnection.db.then((instance:any) => {
      const tx = instance.transaction(['projects'], "readwrite")
      const storeRef = tx.objectStore('projects');

      const addRequest = storeRef.add(data)

      addRequest.onsuccess = function(event:any) {
        if (event.target.result === undefined) {
          reject(`DB: [write] projects add failed`);
        } else {
          console.log('DB: [write] project 1')
          resolve(event.target.result);
        }
      }

      addRequest.onerror = function(error:any) {
        reject(error)
      }
    })
  });
}