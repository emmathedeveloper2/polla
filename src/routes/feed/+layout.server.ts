import type { User } from '$lib/types.js'
import { redirect } from '@sveltejs/kit'



export const load = async ({ locals }) => {

    if(!locals.user) return redirect(302 , '/sign-in')

    let user = JSON.parse(JSON.stringify(locals.user)) as User
    
    user.avatar = locals.db.getFileUrl(user , user.avatar)

    locals.user.avatar = user.avatar

    return {
        user: locals.user,
    }
}