import { redirect } from '@sveltejs/kit'


export const load = async ({ locals }) => {

    if(!locals.user) throw redirect(302 , '/sign-in')

    return {
        user: locals.user
    }
}

export const actions = {
    default: async ({ request , locals , cookies }) => {
        const data = Object.fromEntries(await request.formData()) as Record<string , string>

        if(!locals.user) return {
            error: 'You are not logged in'
        }

        await locals.db.collection('users').update(locals.user.id , data)

        locals.db.collection('users').authRefresh()

        cookies.set('auth', locals.db.authStore.exportToCookie() , { sameSite: 'lax' , path: '/' });

        throw redirect(302 , '/feed')
    }
}