import { update_vote } from '$lib/server/db.js'
import { json } from '@sveltejs/kit'



export const POST = async ({ locals , params }) => {

    if(!locals.user) return json({ success: false , message: 'Unauthorized Access' })

    const [ data , err ] = await update_vote(locals.db , params.poll_id , params.id , locals.user.id)

    if(err || !data) return json({ success: false })

    if(data == 'already_selected') return json({ success: true , new_data: null })

    return json({ success: true , data })
}