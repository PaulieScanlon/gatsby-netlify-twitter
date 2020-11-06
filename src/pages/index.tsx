import React, { FunctionComponent, useEffect, useState } from 'react'

const IndexPage: FunctionComponent = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}`, {
      mode: 'no-cors',
    })
      .then((response) => response.text())
      .then((data) => {
        setData(JSON.parse(data))
        console.log('data:', JSON.parse(data))
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }, [])

  return (
    <main>
      <h1>Index</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </main>
  )
}

export default IndexPage
