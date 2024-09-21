import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(req: Request) {
'use server'

    console.log("sjioi2woi2wjo")

  try {
    const { userId } = auth()
    if (!userId) {
        throw Error("User not found")
      }
      console.log("userID: " + userId)
    //   const provider = 'oauth_google'
    //   const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId, provider)

    // //   const token = clerkResponse[0].token
    //   console.log(clerkResponse)

  

//     if (!token) {
//       return new NextResponse('Unauthorized NO TOKEN', { status: 401 })
//     }

//     // this is the gmail api client, you can use this to make 
//     // any request to the gmail api you can use any other 
//     // google.whatever api you need. Here is we make use of 
//     // the token we got from clerk passed in the headers
//     const gmail = google.gmail({
//       version: 'v1',
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     const res = await gmail.users.labels.list({
//       userId: 'me',
//     })

//     return NextResponse.json(res.data.labels)


  } catch (error) {
    console.log('[GMAIL ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })


  }
  return new NextResponse('sucess', { status: 200 })
}

// export { handler as GET, handler as POST };