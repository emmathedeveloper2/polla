import { authenticate_user } from "$lib/server/db"
import { redirect } from "@sveltejs/kit"




export const actions = {
    // default: async ({ request , locals }) => {
    //     const data = Object.fromEntries(await request.formData()) as Record<string , string>

    //     const [ user , error ] = await authenticate_user(locals.db , data.email , data.password)

    //     if(!user || error) return { error: 'Something went wrong' }

    //     redirect(303 , '/feed')
    // },

    google: async ({ cookies , url , locals }) => {

        const auth_methods = await locals.db.collection('users').listAuthMethods()

        if(!auth_methods) return {
            auth_providers: ''
        }

        const redirect_url = `${url.origin}/api/oauth/callback/google`

        console.log(redirect_url)

        const auth_provider = auth_methods.authProviders.find(provider => provider.name === 'google')

        if(!auth_provider) return {
            auth_providers: ''
        }

        const auth_provider_redirect = `${auth_provider?.authUrl}${redirect_url}`
        
        const state = auth_provider.state

        const verifier = auth_provider.codeVerifier

        cookies.set('state', state , { path: '/' , maxAge: 60 * 60 , httpOnly: true })

        cookies.set('verifier', verifier , { path: '/' , maxAge: 60 * 60, httpOnly: true })

        throw redirect(302, auth_provider_redirect)
    },

    github: async ({ cookies , url , locals }) => {

        const auth_methods = await locals.db.collection('users').listAuthMethods()

        if(!auth_methods) return {
            auth_providers: ''
        }

        const redirect_url = `${url.origin}/api/oauth/callback/github`

        const auth_provider = auth_methods.authProviders.find(provider => provider.name === 'github')

        if(!auth_provider) return {
            auth_providers: ''
        }

        const auth_provider_redirect = `${auth_provider?.authUrl}${redirect_url}`
        
        const state = auth_provider.state

        const verifier = auth_provider.codeVerifier

        cookies.set('state', state , { path: '/' , maxAge: 60 * 60 , httpOnly: true })

        cookies.set('verifier', verifier , { path: '/' , maxAge: 60 * 60, httpOnly: true })

        throw redirect(302, auth_provider_redirect)
    },
}