import init from 'services/indexedDB/init'

interface IPayload {
  name: string
}

const update = async (id: number, payload: IPayload): Promise<boolean> => {
  try {
    const db = await init('Chat')
    const txn = db.transaction('List', 'readwrite')
    const store = txn.objectStore('List')
    const query = store.put(payload, id)

    return new Promise((resolve) => {
      query.addEventListener('success', () => {
        db.close()
        resolve(true)
      })

      query.addEventListener('error', (e: any) => {
        console.log(e)
        db.close()
        resolve(false)
      })
    })

  }

  catch (e) {
    console.log(e)
    console.log('list/update.ts error')
    return false
  }
}

export default update
