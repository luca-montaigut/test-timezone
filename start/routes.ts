/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { DateTime } from 'luxon'
import vine from '@vinejs/vine'

const schema = vine.object({
  startDateTime: vine.date(),
})

const validator = vine.compile(schema)

router.get('/', async ({ auth, inertia }) => {
  return inertia.render('homepage')
})

router.post('/time', async ({ request, response }) => {
  const fields = await validator.validate(request.all())
  const stringFormat = request.input('startDateTime')

  console.log('###########################')
  console.log('WITHOUT VINE')
  const dateTimeOk = DateTime.fromFormat(stringFormat, 'yyyy-MM-dd HH:mm:ss', {
    zone: 'America/New_York',
  })
  console.log('dateTimeOK')
  console.log(
    "\nHeure de l'event à new york, formaté en US, vu depuis n'importe où\n", // puisque je garde la timezone du lieu
    dateTimeOk.toJSDate().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    '\nVRAI\n'
  )
  console.log(
    "\nHeure de l'event à new york, formaté en FR, vu depuis n'importe où\n", // puisque je garde la timezone du lieu
    dateTimeOk.toJSDate().toLocaleString('fr-FR', { timeZone: 'America/New_York' }),
    '\nVRAI\n'
  )
  console.log(
    "\nHeure de l'event à new york, formaté en FR, vu depuis Paris", // puisque je mets la timezone de Paris
    dateTimeOk.toJSDate().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
    '\nVRAI\n'
  )
  console.log('with toUTC()')
  const dateTimeOkUTC = dateTimeOk.toUTC()
  console.log(dateTimeOkUTC.toJSDate().toLocaleString('en-US', { timeZone: 'America/New_York' }))
  console.log(dateTimeOkUTC.toJSDate().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }))

  console.log('ISO')
  console.log('dateTimeOk', dateTimeOk.toISO())
  console.log('dateTimeOkUTC', dateTimeOkUTC.toISO())

  console.log('###########################')
  console.log('WITH VINE')
  console.log(fields.startDateTime.toISOString())
  const datetimeNotOK = DateTime.fromJSDate(fields.startDateTime, { zone: 'America/New_York' })
  console.log(
    "\nHeure de l'event à new york, formaté en US, vu depuis n'importe où\n", // puisque je garde la timezone du lieu
    datetimeNotOK.toJSDate().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    '\nFAUX\n'
  )
  console.log(
    "\nHeure de l'event à new york, formaté en FR, vu depuis n'importe où\n", // puisque je garde la timezone du lieu
    datetimeNotOK.toJSDate().toLocaleString('fr-FR', { timeZone: 'America/New_York' }),
    '\nFAUX\n'
  )
  console.log(
    "\nHeure de l'event à new york, formaté en FR, vu depuis Paris", // puisque je mets la timezone de Paris
    datetimeNotOK.toJSDate().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
    '\nFAUX\n'
  )
  console.log('with toUTC()')
  const dateTimeNoOkUTC = datetimeNotOK.toUTC()
  console.log(dateTimeNoOkUTC.toJSDate().toLocaleString('en-US', { timeZone: 'America/New_York' }))
  console.log(dateTimeNoOkUTC.toJSDate().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }))
  console.log('ISO')
  console.log('datetimeNotOK', datetimeNotOK.toISO())
  console.log('dateTimeNoOkUTC', dateTimeNoOkUTC.toISO())

  return response.redirect().back()
})
