import React, { FunctionComponent, useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Container, Grid, Flex, Box, Image, Link, Heading, Text, Card, Spinner } from 'theme-ui'

const DATE_FORMAT = 'MMM dd yyy'

const IndexPage: FunctionComponent = () => {
  const [response, setResponse] = useState({ user: null })
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/twitter-user`)
      .then((response) => response.text())
      .then((response) => {
        setResponse(JSON.parse(response))
        setIsLoading(false)
      })
      .catch((error) => {
        console.error({ error })
        setIsLoading(false)
        setHasError(true)
      })
  }, [])

  const { user } = response

  return (
    <Container>
      <Box sx={{ py: [3, 4] }}>
        {hasError ? <Text color="error">There's been an error</Text> : null}
        {!hasError && isLoading ? (
          <Flex sx={{ justifyContent: 'center', p: 4 }}>
            <Spinner />
          </Flex>
        ) : (
          <>
            {!hasError && !isLoading && response ? (
              <>
                <Card>
                  <Grid sx={{ gap: 3 }}>
                    <Grid sx={{ alignItems: 'center', gap: 2, gridTemplateColumns: 'auto 1fr' }}>
                      <Image src={user.profile_image_url} sx={{ borderRadius: '50%' }} />
                      <Box>
                        <Heading as="h2">{user.name}</Heading>
                        <Link href={`https://twitter.com/${user.username}`} target="_blank">{`@${user.username}`}</Link>
                      </Box>
                    </Grid>

                    <Grid sx={{ gap: 1 }}>
                      <Text>{user.description}</Text>
                      <Link sx={{ color: 'secondary' }} href={user.entities.url.urls[0].expanded_url} target="_blank">
                        {user.entities.url.urls[0].display_url}
                      </Link>
                    </Grid>
                    <Grid sx={{ gap: 1 }}>
                      <Grid sx={{ gap: 2, gridTemplateColumns: ['1fr', 'auto 1fr'] }}>
                        <Text variant="small">
                          Joined:{' '}
                          <Text variant="small" as="span" sx={{ fontWeight: 'bold' }}>
                            {format(parseISO(user.created_at), DATE_FORMAT)}
                          </Text>
                        </Text>
                        <Text variant="small">
                          Location:{' '}
                          <Text variant="small" as="span" sx={{ fontWeight: 'bold' }}>
                            {user.location}
                          </Text>
                        </Text>
                      </Grid>

                      <Grid sx={{ gap: 2, gridTemplateColumns: ['1fr', 'auto auto 1fr'] }}>
                        <Text variant="small">
                          Following:{' '}
                          <Text variant="small" as="span" sx={{ fontWeight: 'bold' }}>
                            {user.public_metrics.following_count}
                          </Text>
                        </Text>
                        <Text variant="small">
                          Followers:{' '}
                          <Text variant="small" as="span" sx={{ fontWeight: 'bold' }}>
                            {user.public_metrics.followers_count}
                          </Text>
                        </Text>
                        <Text variant="small">
                          Total Tweets:{' '}
                          <Text variant="small" as="span" sx={{ fontWeight: 'bold' }}>
                            {user.public_metrics.tweet_count}
                          </Text>
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
                <Box as="pre" variant="styles.pre">
                  <Box as="code" variant="styles.code">
                    {JSON.stringify(user, null, 2)}
                  </Box>
                </Box>
              </>
            ) : null}
          </>
        )}
      </Box>
    </Container>
  )
}

export default IndexPage

{
  /* <pre>
<code>{JSON.stringify(user, null, 2)}</code>
</pre>  */
}
