import React, { FunctionComponent, useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Container, Grid, Flex, Box, Image, Link, Heading, Text, Card, Spinner } from 'theme-ui'

const DATE_FORMAT = 'MMM dd yyy'

const IndexPage: FunctionComponent = () => {
  const [response, setResponse] = useState({ user: null })
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/twitter-user`, {
      mode: 'no-cors',
      method: 'GET',
    })
      .then((response) => response.text())
      .then((response) => {
        setResponse(JSON.parse(response))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log({ error })
        setIsLoading(false)
        setHasError(true)
      })
  }, [])

  const { user } = response

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
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
            gap: 4,
            py: 4,
          }}
        >
          {!hasError && !isLoading && response ? (
            <>
              <Flex>
                <Card>
                  <Grid sx={{ gap: 2 }}>
                    <Grid sx={{ alignItems: 'center', gap: 2, gridTemplateColumns: 'auto 1fr' }}>
                      <Image src={user.profile_image_url} sx={{ borderRadius: '50%' }} />
                      <Box>
                        <Heading as="h3">{user.name}</Heading>
                        <Link
                          sx={{ lineHeight: 1, textDecoration: 'none', fontSize: 0 }}
                          href={`https://twitter.com/${user.username}`}
                          target="_blank"
                        >{`@${user.username}`}</Link>
                      </Box>
                    </Grid>
                    <Text sx={{ fontSize: 0 }}>{user.description}</Text>
                    <Grid sx={{ gap: 2, gridTemplateColumns: 'auto 1fr' }}>
                      <Text sx={{ fontSize: 0 }}>
                        Joined:{' '}
                        <Text as="span" sx={{ fontWeight: 'bold' }}>
                          {format(parseISO(user.created_at), DATE_FORMAT)}
                        </Text>
                      </Text>
                      <Text sx={{ fontSize: 0 }}>
                        Location:{' '}
                        <Text as="span" sx={{ fontWeight: 'bold' }}>
                          {user.location}
                        </Text>
                      </Text>
                    </Grid>

                    <Grid sx={{ gap: 2, gridTemplateColumns: 'auto auto 1fr' }}>
                      <Text sx={{ fontSize: 0 }}>
                        Following:{' '}
                        <Text as="span" sx={{ fontWeight: 'bold' }}>
                          {user.public_metrics.following_count}
                        </Text>
                      </Text>
                      <Text sx={{ fontSize: 0 }}>
                        Followers:{' '}
                        <Text as="span" sx={{ fontWeight: 'bold' }}>
                          {user.public_metrics.followers_count}
                        </Text>
                      </Text>
                      <Text sx={{ fontSize: 0 }}>
                        Total Tweets:{' '}
                        <Text as="span" sx={{ fontWeight: 'bold' }}>
                          {user.public_metrics.tweet_count}
                        </Text>
                      </Text>
                    </Grid>
                  </Grid>
                </Card>
                {/* <pre>
                  <code>{JSON.stringify(user, null, 2)}</code>
                </pre> */}
              </Flex>
            </>
          ) : null}
        </Grid>
      )}
    </Container>
  )
}

export default IndexPage
