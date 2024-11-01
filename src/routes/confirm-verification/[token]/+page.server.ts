import { resolve_promise } from "$lib"



export const load = async ({ locals , params }) => {

    const [ data , error ] = await resolve_promise(async () => await locals.db.collection('users').confirmVerification(params.token))

    if(error || !data) return { error: 'Invalid token' }

    return { sucess: true }
}