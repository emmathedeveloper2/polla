import { json, redirect } from "@sveltejs/kit"



export const GET = async ({ url , cookies , locals , params }) => {

    const redirect_url = `${url.origin}/api/oauth/callback/${params.provider}`

    const expected_state = cookies.get('state')

    const expected_verifier = cookies.get('verifier')

    const code = url.searchParams.get('code')

    const state = url.searchParams.get('state')

    if(!code || !state || !expected_verifier) return json({
        error: 'Invalid request'
    })

    if(expected_state !== state) return json({
        error: 'Invalid request'
    })

    const auth_methods = await locals.db.collection('users').listAuthMethods()

    if(!auth_methods.authProviders) throw redirect(302, '/sign-in')

    const auth_provider = auth_methods.authProviders.find(provider => provider.name === params.provider)

    if(!auth_provider) throw redirect(302, '/sign-in')

    try {
        await locals.db.collection('users').authWithOAuth2Code(auth_provider.name , code , expected_verifier , redirect_url , {
            name: 'user' + Math.floor(Math.random() * 1000000000)
        })

        await locals.db.collection('users').authRefresh()

        cookies.set('auth', locals.db.authStore.exportToCookie() , { sameSite: 'lax' , path: '/' });
    } catch (error) {
        throw redirect(302, '/sign-in')
    }
    
    throw redirect(302 , '/feed')
}