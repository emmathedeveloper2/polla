import { create_poll } from '$lib/server/db.js'
import { json } from '@sveltejs/kit'


export const POST = async ({ locals , request }) => {

    if(!locals.user) return json({ success: false })

    const poll = await request.json()

    const [user , err] = await create_poll(locals.db , {...poll , author: locals.user.id , total_comments: 0})

    if(!user || err) return json({ success: false })

    return json({ success: true })
}