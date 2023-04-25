import init from 'services/indexedDB/init'

interface IPayload {
  role: 'user' | 'assistant',
  content: string
  list_id: number
}

interface IData extends IPayload {
  id: number
}

interface IReturn {
  error?: any
  data?: IData
}

const insert = async (payload: IPayload): Promise<IReturn> => {
  try {
    const db = await init('Chat')
    const txn = db.transaction('Message', 'readwrite')
    const store = txn.objectStore('Message')

    const query = store.put(payload)

    return new Promise((resolve) => {
      query.addEventListener('success', (e: any) => {
        const data = {
          id: e.target.result,
          ...payload
        }

        db.close()

        resolve({ data })
      })

      query.addEventListener('error', (e: any) => {
        db.close()
        resolve({ error: e })
      })
    })
  }

  catch (e) {
    console.log(e)
    console.log('insert message error')
    return { error: 'IndexedDB Error' }
  }
}

export default insert
