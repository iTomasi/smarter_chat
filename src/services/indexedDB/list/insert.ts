import init from 'services/indexedDB/init'

interface IPayload {
  name: string
}

const insert = async (payload: IPayload) => {
  try {
    const db: any = await init('Chat')

    const txn = db.transaction('List', 'readwrite')
    const store = txn.objectStore('List')

    const query = store.put(payload)

    return new Promise((resolve) => {
      query.addEventListener('success', (e: any) => {
        const data = {
          id: e.target.result,
          ...payload
        }

        db.close()

        resolve({
          data
        })
      })

      query.addEventListener('error', (e: any) => {
        resolve({ error: e })
      })  
    })  
  }

  catch (e) {
    console.log(e)
    console.log('insert() error')
    return { error: 'IndexedDB Error' }
  }
}

export default insert