import { Request, Response } from 'express'
import db from '../database/connection'
import { convertHoursToMinutes } from '../utils'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

async function index(req: Request, res: Response) {
  const filters = req.query

  const subject = filters.subject as string
  const week_day = filters.week_day as string
  const time = filters.time as string

  if (!filters.week_day || !filters.subject || !filters.time) {
    return res.status(400).json({ error: 'Missing filters to search classes' })
  }

  const timeInMinutes = convertHoursToMinutes(time)

  try {
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
          .whereRaw('class_schedule.from <= ??', [timeInMinutes])
          .whereRaw('class_schedule.to > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return res.json(classes)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function create(req: Request, res: Response) {
  const {
    name,
    surname,
    email,
    password,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = req.body

  const trx = await db.transaction()

  try {
    const user_id = await trx('users')
      .insert({
        name,
        surname,
        email,
        password,
        avatar,
        whatsapp,
        bio,
      })
      .returning('id')

    const class_id = await trx('classes')
      .insert({
        subject,
        cost,
        user_id: user_id[0],
      })
      .returning('id')

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id: class_id[0],
        week_day: scheduleItem.week_day,
        from: convertHoursToMinutes(scheduleItem.from),
        to: convertHoursToMinutes(scheduleItem.to),
      }
    })

    await trx('class_schedule').insert(classSchedule)

    await trx.commit()

    return res.status(201).send()
  } catch (error) {
    await trx.rollback()

    return res
      .status(400)
      .json({ error: 'Unexpected error while creating new class' })
  }
}

export default { index, create }
