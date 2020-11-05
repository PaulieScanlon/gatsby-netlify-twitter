import React, { FunctionComponent, useEffect, useState } from 'react'

const IndexPage: FunctionComponent = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    fetch('https://brandcamp.netlify.app/.netlify/functions/twitter')
      .then((response) => response.text())
      .then((data) => {
        console.log('data:', data)
        setData(data)
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
