import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react'

const IndexPage: FunctionComponent = () => {
  const [data, setData] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [searchValue, setSearchValue] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setData('')

    Boolean(searchValue)
      ? fetch(`${process.env.GATSBY_API_URL}`, {
          mode: 'no-cors',
          method: 'POST',
          body: JSON.stringify({ userNameA: userName, userNameB: '' }),
        })
          .then((response) => response.text())
          .then((data) => {
            setIsLoading(false)
            setData(JSON.parse(data))
            console.log('data:', JSON.parse(data))
          })
          .catch((error) => {
            console.log('error: ', error)
            setIsLoading(false)
            setHasError(true)
          })
      : null
  }, [searchValue])

  return (
    <main>
      <h1>Index</h1>
      <input value={userName} onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)} />
      <button onClick={() => setSearchValue(userName)}>Search Username</button>
      {data ? (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ) : null}
      {isLoading && searchValue !== null ? <div>Loading....</div> : null}
      {hasError && searchValue !== null ? <div>There's been an error</div> : null}
    </main>
  )
}

export default IndexPage
