import { resolve_promise } from '$lib'
import { json } from '@sveltejs/kit'



export const POST = async ({ locals }) => {

    const [ data , err ] = await resolve_promise(async () => {
        return await locals.db.collection('users').requestVerification(locals.user.email)
    })

    if(err || !data) return json({ success: false })

    return json({ success: true })
}