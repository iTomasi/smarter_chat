interface IData {
  id: number
  name: string
}

const getAll = (db: any) => {
  const txn = db.transaction('List', 'readonly')
  const store = txn.objectStore('List')

  const openCursor = store.openCursor()

  const data: IData[] = []

  return new Promise((resolve) => {
    openCursor.addEventListener('success', (e: any) => {
      const cursor = e.target.result

      if (!cursor) return resolve({ data })

      data.push({
        id: cursor.primaryKey,
        ...cursor.value
      })

      cursor.continue()
    })

    openCursor.addEventListener('error', (e: any) => resolve({ error: e }))
  
    // txn.addEventListener('complete', () => db.close())
  })

}

export default getAll
