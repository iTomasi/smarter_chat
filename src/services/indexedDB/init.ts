const init = (name: string) => {
  const request = indexedDB.open(name)

  return new Promise((resolve, reject) => {
    request.addEventListener('success', (e: any) => resolve(e.target.result))
    request.addEventListener('error', (e: any) => reject(e))
  })
}

export default init
