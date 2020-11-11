import React, { FunctionComponent, useEffect, useState } from 'react'

import { Container, Grid, Flex, Box, Image, Text, Card, Spinner } from 'theme-ui'

const IndexPage: FunctionComponent = () => {
  const [response, setResponse] = useState({
    data: [],
    mention_count: 0,
    url_count: 0,
    date_range: { start: '', end: '', days_between: 0 },
  })
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}`, {
      mode: 'no-cors',
      method: 'GET',
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(JSON.parse(response))
        setResponse(JSON.parse(response))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log({ error })
        setIsLoading(false)
        setHasError(true)
      })
  }, [])

  console.log({ response })

  return (
    <Container>
      {hasError ? <Text color="error">There's been an error</Text> : null}
      {!hasError && isLoading ? (
        <Flex sx={{ justifyContent: 'center', p: 4 }}>
          <Spinner />
        </Flex>
      ) : (
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gap: 4,
            py: 4,
          }}
        >
          <Box>
            {response.data.map((tweet: any, index: number) => {
              const {
                text,
                author_id,
                _special: { my_username, my_author_id, formatted_date, image_src },
              } = tweet

              return (
                <Card key={index}>
                  <Grid sx={{ gap: 4 }}>
                    <Flex sx={{ justifyContent: 'space-between' }}>
                      <Flex>
                        <Text sx={{ mr: 2 }}>{index}</Text>
                        {author_id === my_author_id ? (
                          <Text sx={{ fontWeight: 'bold' }}>{`@${my_username}`}</Text>
                        ) : null}
                      </Flex>

                      <Text sx={{ fontSize: 0 }}>{formatted_date}</Text>
                    </Flex>
                    <Text sx={{ fontStyle: 'italic' }}>{text}</Text>
                    <Image src={image_src.url} />
                  </Grid>
                </Card>
              )
            })}
          </Box>
          <Box>
            <Text>{`you've recently been mentioned x${response.mention_count} times`}</Text>
            <br />
            <Text>{`x${response.url_count} of your recent tweets or mentions contained URLs`}</Text>
            <br />
            <Text>{`displaying ${response.data.length} tweets from the last ${response.date_range.days_between} day(s)`}</Text>
            <ul>
              <li>{`from: ${response.date_range.end}`}</li>
              <li>{`to: ${response.date_range.start}`}</li>
            </ul>
          </Box>
        </Grid>
      )}
    </Container>
  )
}

export default IndexPage
