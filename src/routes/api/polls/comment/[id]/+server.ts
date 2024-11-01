import { resolve_promise } from "$lib"
import { get_comments, post_comment } from "$lib/server/db.js"
import type { PocketBasePageResponse , Comment } from "$lib/types"
import { json } from "@sveltejs/kit"

export const GET = async ({ locals , params , url }) => {

    const poll_id = params.id

    const page = parseInt(url.searchParams.get('page') || '1')

    const [ data , error ] = await get_comments(locals.db , page , poll_id)

    return json({ success: error ? false : true , error , data })
}

export const POST = async ({ locals , params , request }) => {

    if(!locals.user) return json({ success: false , error: 'Invalid Request' })

    const { text } = await request.json()

    const post_id = params.id

    const [ res , error ] = await post_comment(locals.db , text , post_id , locals.user.id)

    const data = { ...res , expand: { author: locals.user } }

    return json({ success: error ? false : true , data , error })
}