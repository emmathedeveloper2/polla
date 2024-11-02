import { resolve_promise } from '$lib'
import { redirect } from '@sveltejs/kit'


export const load = async ({ locals }) => {

    if(!locals.user) throw redirect(302 , '/sign-in')

    const user = {
        ...locals.user,
        avatar: locals.db.getFileUrl(locals.user , locals.user.avatar)
    }

    return {
        user
    }
}

export const actions = {
    default: async ({ request , locals }) => {
        const data = await request.formData() as any

        if(!locals.user) return {
            error: 'You are not logged in'
        }

        const [ _ , err ] = await resolve_promise(async () => {

            if(!locals.user) return

            await locals.db.collection('users').update(locals.user.id , data)
        })

        throw redirect(302 , '/feed')
    }
}