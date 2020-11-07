import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react'

import { Container, Grid, Flex, Image, Text, Card, Input, Button, Heading, Spinner, Divider } from 'theme-ui'

interface IMedia {
  url?: string
  media_key?: string
}
interface IResponse {
  data: any[]
  meta: any[]
  includes: {
    media: IMedia[]
  }
}

const getMediaUrl = (attachments: any, media: any) => {
  if (attachments && attachments.media_keys.length) {
    const bingo = attachments.media_keys.toString()
    const thing = media.filter((media) => media.media_key === bingo)

    return {
      preview_image_url: '',
      url: '',
      ...thing[0],
    }
  } else {
    return {
      media_key: '',
      type: '',
      url: '',
      preview_image_url: '',
    }
  }
}

const IndexPage: FunctionComponent = () => {
  const [response, setResponse] = useState<IResponse>()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [searchValue, setSearchValue] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setResponse(null)

    // console.log(process.env.NODE_ENV)

    Boolean(searchValue)
      ? fetch(`${process.env.GATSBY_API_URL}`, {
          mode: 'no-cors',
          method: 'POST',
          body: JSON.stringify({ userNameA: userName, userNameB: '' }),
        })
          .then((response) => response.text())
          .then((response) => {
            setIsLoading(false)
            // console.log('responseincludes.media: ', JSON.parse(response).includes.media)
            setResponse(JSON.parse(response))
            // .filter((data) => !data.entities.mentions)
          })
          .catch((error) => {
            // console.log('error: ', error)
            setIsLoading(false)
            setHasError(true)
          })
      : null
  }, [searchValue])

  return (
    <Container>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '0.5fr'],
          pt: 4,
          gap: 4,
        }}
      >
        <Heading as="h1" variant="h1">
          BrandCamp
        </Heading>

        <Grid
          sx={{
            gap: 2,
            gridTemplateColumns: ['1fr', '2fr 1fr'],
          }}
        >
          <Input
            placeholder="PaulieScanlon"
            value={userName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
          />
          <Button onClick={() => setSearchValue(userName)}>Search</Button>
        </Grid>
      </Grid>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '0.5fr'],
          gap: 4,
          py: 4,
        }}
      >
        {isLoading && searchValue !== null ? (
          <Flex sx={{ justifyContent: 'center', p: 4 }}>
            <Spinner />
          </Flex>
        ) : null}
        {hasError && searchValue !== null ? <Text color="error">There's been an error</Text> : null}
        {response
          ? response.data.map((data: any, index: number) => {
              const { id, created_at, text, attachments } = data
              return (
                <Card key={index}>
                  <Grid sx={{ gap: 1 }}>
                    <Text sx={{ fontSize: 0 }}>{index}</Text>
                    <Text sx={{ fontSize: 0 }}>{id}</Text>
                    <Text>{created_at}</Text>
                    <Text>{text}</Text>
                    <Divider />
                    <Image src={getMediaUrl(attachments, response.includes.media).url} />
                  </Grid>
                </Card>
              )
            })
          : null}
      </Grid>
    </Container>
  )
}

export default IndexPage
