// 'use client'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'
import { SignIn } from "@clerk/nextjs";

// export default function Calendar(){
//     return (
//     <div>
//         <p>Calendar</p>
//         <button onClick={insertEvent}></button>
//     </div>
//     )
// }

async function insertEvent(){
    try {
        const { userId } = auth()
        if (!userId) {
            new Error('No User found')
          }
          console.log("userID: " + userId)
          const provider = 'oauth_google'
          const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId!, provider)
    
          const token = clerkResponse.data.map(obj => obj.token)[0];
          console.log("token: " + token)
    
        if (!token) {
          return new Error('Unauthorized NO TOKEN')
        }
    
        // this is the gmail api client, you can use this to make 
        // any request to the gmail api you can use any other 
        // google.whatever api you need. Here is we make use of 
        // the token we got from clerk passed in the headers
        const calendar = google.calendar({
          version: 'v3',
          headers: { Authorization: `Bearer ${token}` },
        })
    
        const event = createEvent()
        await fetch("hhtps://www.googleapis.com/calendar/primary/events", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then((data)=> {
            console.log(data);

        })
        
        // var res = null
        // try {
        //   const res = calendar.events.insert({
        //     calendarId: 'primary',
        //     requestBody: createEvent(), 
        //   });
        //   // console.log('Event created: %s', res.data.htmlLink);
        // } catch (err) {
        //   console.error('There was an error contacting the Calendar service: ', err);
        // }
    
        // const res = await calendar.events.list({
        //   calendarId: 'primary',
        //   timeMin: new Date().toISOString(),
        //   maxResults: 10,
        //   singleEvents: true,
        //   orderBy: 'startTime',
        // });
        // const events = res.data.items;
        // if (!events || events.length === 0) {
        // console.log('No upcoming events found.');
        // return;
        //   }
        // console.log('Upcoming 10 events:');
        // events.map((event, i) => {
        //   if(!event || !event.start)  return new NextResponse('Error Event', { status: 500 })
        //   const start = event.start.dateTime || event.start.date;
        //   console.log(`${start} - ${event.summary}`);
        // });
        // const res = await gmail.users.labels.list({
        //   userId: 'me',
        // })    
    
    
      } catch (error) {
        console.log('[GMAIL ERROR]', error)    
      }
}

async function createEvent(){
    const event = {
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
      return event;
}

