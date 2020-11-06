import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react'

const IndexPage: FunctionComponent = () => {
  const [data, setData] = useState('')
  const [userName, setUserName] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}`, {
      mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({ userNameA: userName, userNameB: '' }),
    })
      .then((response) => response.text())
      .then((data) => {
        setData(JSON.parse(data))
        console.log('data:', JSON.parse(data))
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }, [searchValue])

  return (
    <main>
      <h1>Index</h1>
      <input value={userName} onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)} />
      <button onClick={() => setSearchValue(userName)}>Search Username</button>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </main>
  )
}

export default IndexPage
