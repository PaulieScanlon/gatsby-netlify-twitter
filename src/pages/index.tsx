import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react'

import { Container, Grid, Flex, Text, Card, Input, Button, Heading, Spinner } from 'theme-ui'

const IndexPage: FunctionComponent = () => {
  const [response, setResponse] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [searchValue, setSearchValue] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setResponse([])

    // console.log(process.env.NODE_ENV)

    Boolean(searchValue)
      ? fetch(`${process.env.GATSBY_API_URL}`, {
          mode: 'no-cors',
          method: 'POST',
          body: JSON.stringify({ userNameA: userName, userNameB: '' }),
        })
          .then((response) => response.text())
          .then((data) => {
            setIsLoading(false)
            setResponse(JSON.parse(data))
            // console.log('data:', JSON.parse(data))
          })
          .catch((error) => {
            console.log('error: ', error)
            setIsLoading(false)
            setHasError(true)
          })
      : null
  }, [searchValue])

  return (
    <Container>
      <Grid
        sx={{
          pt: 4,
          gap: 4,
        }}
      >
        <Heading as="h1" variant="h1">
          BrandCamp
        </Heading>

        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr', '3fr 1fr'],
          }}
        >
          <Input
            value={userName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
          />
          <Button onClick={() => setSearchValue(userName)}>Search Username</Button>
        </Grid>
      </Grid>
      {isLoading && searchValue !== null ? (
        <Flex sx={{ justifyContent: 'center', p: 4 }}>
          <Spinner />
        </Flex>
      ) : null}
      {hasError && searchValue !== null ? <Text color="error">There's been an error</Text> : null}
      <Grid
        sx={{
          gridTemplateColumns: '0.5fr',
          gap: 4,
          py: 4,
        }}
      >
        {response
          ? response.map((data: any, index: number) => {
              const { created_at, text } = data

              return (
                <Card key={index}>
                  <Text>{created_at}</Text>
                  <Text>{text}</Text>
                </Card>
              )
            })
          : null}
      </Grid>
    </Container>
  )
}

export default IndexPage

// {response ? (
//   <pre>
//     <code>{JSON.stringify(response, null, 2)}</code>
//   </pre>
// ) : null}
