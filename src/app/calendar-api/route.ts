import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(req: Request) {
'use server'

    console.log("sjioi2woi2wjo")

  try {
    const { userId } = auth()
    if (!userId) {
        new NextResponse('No User found', { status: 401 })
      }
      console.log("userID: " + userId)
      const provider = 'oauth_google'
      const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId!, provider)

      const token = clerkResponse.data.map(obj => obj.token)[0];
      console.log("token: " + token)

    if (!token) {
      return new NextResponse('Unauthorized NO TOKEN', { status: 401 })
    }

    // this is the gmail api client, you can use this to make 
    // any request to the gmail api you can use any other 
    // google.whatever api you need. Here is we make use of 
    // the token we got from clerk passed in the headers
    const calendar = google.calendar({
      version: 'v3',
      headers: { Authorization: `Bearer ${token}` },
    })

    const newEvent = {
      'summary': 'New Event',
      'description': 'Messing around iwth google calendar',
      'start': {
        'dateTime': '2024-09-15T22:30:00',
        'timeZone': 'Europe/Warsaw',
      },
      'end': {
        'dateTime': '2024-09-15T23:00:00',
        'timeZone': 'Europe/Warsaw',
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
    };

    var res = null
    try {
      console.log("before insert")
      res = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: 'New Event',
          start: {
            dateTime: '2024-09-21T22:30:00+02:00',
            timeZone: 'Europe/Warsaw',
          },
          end: {
            dateTime: '2024-09-21T23:00:00+02:00',
            timeZone: 'Europe/Warsaw',
          },
        }
      });
      // console.log('Event created: %s', res.data.htmlLink);
    } catch (err) {
      console.error('There was an error contacting the Calendar service: ', err);
    }

    //  res = await calendar.events.list({
    //   calendarId: 'primary',
    //   timeMin: new Date().toISOString(),
    //   maxResults: 10,
    //   singleEvents: true,
    //   orderBy: 'startTime',
    // });
    // const events = res.data.items;
    // if (!events || events.length === 0) {
    //   console.log('No upcoming events found.');
    //   return;
    //   }
    // console.log('Upcoming 10 events:');
    // events.map((event, i) => {
    //   if(!event || !event.start)  return new NextResponse('Error Event', { status: 500 })
    //   const start = event.start.dateTime || event.start.date;
    //   console.log(`${start} - ${event.summary}`);
    // });
  

    if (res == null) return new NextResponse("Error inserting event", {status: 500})

    return NextResponse.json(res)


  } catch (error) {
    console.log('[GMAIL ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

