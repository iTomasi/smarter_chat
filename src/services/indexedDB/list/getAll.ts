import init from 'services/indexedDB/init'

interface IPayload {
  id: number
  name: string
}

interface IReturn {
  error?: any
  data?: IPayload[]
}

const getAll = async (): Promise<IReturn> => {
  try {
    const db = await init('Chat')
    const txn = db.transaction('List', 'readonly')
    const store = txn.objectStore('List')
    const openCursor = store.openCursor()

    const output: IPayload[] = []

    return new Promise((resolve) => {
      openCursor.addEventListener('success', (e: any) => {
        const cursor = e.target.result
  
        if (!cursor) return resolve({ data: output })

        output.push({
          id: cursor.primaryKey,
          ...cursor.value
        })

        cursor.continue()
      })

      openCursor.addEventListener('error', (e: any) => {
        resolve({ error: e })
      })
    })
  }

  catch (e) {
    console.log(e)
    console.log('getAll() Error')
    return { error: 'IndexedDB Error' }
  }
}

export default getAll
