import init from 'services/indexedDB/init'

interface IData {
  id: number
  role: 'assistant' | 'user'
  content: string
  list_id: number
}

interface IReturn {
  error?: any
  data?: IData[]
}

const getByListId = async (id: number): Promise<IReturn> => {
  try {
    const db = await init('Chat')
    const txn = db.transaction('Message', 'readonly')
    const store = txn.objectStore('Message')

    const data: IData[] = []

    const openCursor = store.openCursor()

    return new Promise((resolve) => {
      openCursor.addEventListener('success', (e: any) => {
        const cursor = e.target.result

        if (!cursor) return resolve({ data })
        else if (cursor.value.list_id === id) {
          data.push({
            id: cursor.primaryKey,
            ...cursor.value
          })
        }

        cursor.continue()
      })

      openCursor.addEventListener('error', (e: any) => {
        db.close()

        resolve({
          error: e
        })
      })
    })
  }

  catch (e) {
    console.log(e)
    console.log('getByListId() Error')
    return { error: 'IndexedDB Error' }
  }
}

export default getByListId
