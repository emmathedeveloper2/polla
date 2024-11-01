import { get_comments, get_poll } from "$lib/server/db"
import { redirect } from "@sveltejs/kit"



export const load = async ({ params , locals }) => {

    const [  poll , err ] = await get_poll(locals.db , params.id)

    if(poll?.expand) poll.expand.author = {
        ...poll.expand.author,
        avatar: locals.db.getFileUrl(poll.expand.author , poll.expand.author.avatar)
    }

    const [ data , _ ] = await get_comments(locals.db , params.id)

    if(!poll || err) return redirect(302 , '/')

    return {
        poll,
        comments: data
    }
}