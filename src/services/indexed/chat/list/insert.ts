interface IData {
  name: string
}

const insert = (db: any, payload: IData) => {
  const txn = db.transaction('List', 'readwrite')
  const store = txn.objectStore('List')

  const query = store.put(payload)

  return new Promise((resolve) => {
    query.addEventListener('success', (e: any) => {
      const data = {
        id: e.target.result,
        ...payload
      }
      resolve({ data })
    })
    query.addEventListener('error', (e: any) => resolve({ error: e }))
    // txn.addEventListener('complete', () => db.close())
  })
}

export default insert
