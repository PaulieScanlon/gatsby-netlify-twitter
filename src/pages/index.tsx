import React, { FunctionComponent, useEffect, useState } from 'react'

import { Container, Grid, Flex, Image, Text, Card, Spinner } from 'theme-ui'

const IndexPage: FunctionComponent = () => {
  const [tweets, setTweets] = useState({ data: null })
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}`, {
      mode: 'no-cors',
      method: 'GET',
    })
      .then((response) => response.text())
      .then((response) => {
        setIsLoading(false)
        setTweets(JSON.parse(response))
      })
      .catch((error) => {
        console.log({ error })
        setIsLoading(false)
        setHasError(true)
      })
  }, [])

  console.log(tweets.data)

  return (
    <Container>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '0.5fr'],
          gap: 4,
          py: 4,
        }}
      >
        {isLoading ? (
          <Flex sx={{ justifyContent: 'center', p: 4 }}>
            <Spinner />
          </Flex>
        ) : null}
        {hasError ? <Text color="error">There's been an error</Text> : null}
        {tweets.data ? (
          <>
            {tweets.data.map((tweet: any, index: number) => {
              const {
                text,
                _special: { my_username, formatted_date, image_src },
              } = tweet

              return (
                <Card key={index}>
                  <Grid sx={{ gap: 4 }}>
                    <Flex sx={{ justifyContent: 'space-between' }}>
                      <Text>{`@${my_username}`}</Text>
                      <Text sx={{ fontSize: 0 }}>{formatted_date}</Text>
                    </Flex>
                    <Text sx={{ fontStyle: 'italic' }}>{text}</Text>
                    <Image src={image_src.url} />
                  </Grid>
                </Card>
              )
            })}
          </>
        ) : null}
      </Grid>
    </Container>
  )
}

export default IndexPage
