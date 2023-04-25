import init from 'services/indexedDB/init'

const remove = async (id: number): Promise<boolean> => {
  try {
    const db = await init('Chat')

    const txn = db.transaction(['List', 'Message'], 'readwrite')
    const store = txn.objectStore('List')
    const storeMessage = txn.objectStore('Message')

    const query = store.delete(id)

    return new Promise((resolve) => {
      query.addEventListener('success', () => {
        const openCursorMessage = storeMessage.openCursor()

        openCursorMessage.addEventListener('success', (e: any) => {
          const cursor = e.target.result

          if (!cursor) return resolve(true)
          else if (cursor.value.list_id === id) {
            cursor.delete()
          }
          cursor.continue()
        })

        openCursorMessage.addEventListener('error', (e: any) => {
          console.log(e)
          resolve(true)
        })


      })

      query.addEventListener('error', () => {
        db.close()
        resolve(false)
      })
    })

  }

  catch (e) {
    console.log(e)
    console.log('list/remove.ts error')
    return false
  }

}

export default remove