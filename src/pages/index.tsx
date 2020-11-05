import React, { FunctionComponent, useEffect } from 'react'

const IndexPage: FunctionComponent = () => {
  useEffect(() => {
    fetch('https://brandcamp.netlify.app/.netlify/functions/twitter')
      .then((response) => response.text())
      .then((data) => {
        console.log('data:', data)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }, [])

  return <main>Index</main>
}

export default IndexPage
