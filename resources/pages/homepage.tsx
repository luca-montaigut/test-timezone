import { Flex, HStack, Container, Box, Stack } from '#styled-system/jsx'
import { Button, Text, Heading, Input } from '../components/ui'
import { css } from '#styled-system/css'
import { Head, router, useForm } from '@inertiajs/react'

export default function Home() {
  const { data, setData, transform, post } = useForm({
    date: '',
    time: '',
  })

  console.log(data.date, data.time)

  transform((values) => {
    return {
      startDateTime: `${values.date} ${values.time}:00`,
    }
  })

  return (
    <Container>
      <Head title="Homepage" />
      <Heading>Date et heure de l'évènement à New York</Heading>
      <Stack gap="4" maxW="400px">
        <Input
          type="date"
          value={data.date}
          onChange={(e) => {
            setData('date', e.target.value)
          }}
        />
        <Input
          type="time"
          value={data.time}
          onChange={(e) => {
            setData('time', e.target.value)
          }}
        />
        <Button
          onClick={() => {
            post('/time')
          }}
        >
          POST
        </Button>
      </Stack>
    </Container>
  )
}
