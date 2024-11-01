import { env } from "$env/dynamic/private";
import PocketBase from "pocketbase";
import { resolve_promise } from '$lib';
import type { Option, PocketBasePageResponse, Poll , Comment } from "$lib/types";

const DB_URL = env.NODE_ENV === "production" ? env.DATABASE_URL : env.DEV_DATABASE_URL;

export const create_db_instance = () => {
    const db = new PocketBase(DB_URL);

    return db
}


export const create_user = async (db: PocketBase , data: Record<string , string>) => {
    return await resolve_promise(async () => await db.collection('users').create({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.password,
        emailVisibility: true,
    }))
}

export const authenticate_user = async (db: PocketBase , email: string , password: string) => {
    return await resolve_promise(async () => await db.collection('users').authWithPassword(email , password))
}

export const create_poll = async (db: PocketBase , poll: Poll<string>) => {
    return await resolve_promise(async () => await db.collection('polls').create({
        ...poll,
        options: JSON.stringify(poll.options)
    }))
}

export const get_paginated_polls = async (db: PocketBase, page = 1) => {
	return await resolve_promise(
		async () => {
			let data = await db.collection('polls').getList(page, 10, {
				sort: '-created',
				expand: 'author'
			}) as any as PocketBasePageResponse<Poll<Option[]>>

            if(data) data.items = data.items.map(item => {
            
                const new_item = item
        
                if(!new_item.expand) return item
        
                new_item.expand.author = {
                    ...new_item.expand.author,
                    avatar: db.getFileUrl(new_item.expand.author , new_item.expand.author.avatar)
                }
        
                return new_item
            })
    
            return data
        }
	);
};

export const get_poll = async (db: PocketBase , id: string) => {
	return await resolve_promise(
		async () => await db.collection('polls').getOne(id , {
            expand: 'author'
        }) as any as Poll<Option[]>
	);
};  

export const update_vote = async (db: PocketBase , poll_id: string , option_id: string , user_id: string) => {

    return await resolve_promise(async () => {

        let options = (await db.collection('polls').getOne(poll_id)).options as Option[]

        const found = options.find(o => o.votes.includes(user_id))

        if(found?.id == poll_id) return 'already_selected'

        if(found) found.votes = found.votes.filter(id => id !== user_id)

        let newly_selected_option = options.find(o => o.id == option_id)

        newly_selected_option?.votes.push(user_id)

        return await db.collection('polls').update(poll_id , {
            options: JSON.stringify(options)
        }) as any as Poll<Option[]>
    }) 
}

export const post_comment = async (db: PocketBase , text: string , poll_id: string, author: string) => {

	return await resolve_promise(async () => {

        const comment = await db.collection('comments').create({
            text,
            author,
            poll_id,
        })

        await db.collection('polls').update(poll_id , {
            'total_comments+': 1
        })

        return comment as any as Comment
    })
}

export const get_comments = async (db: PocketBase , poll_id: string , page = 1) => {
    return await resolve_promise(async () => {

        let data = await db.collection('comments').getList(
            page,
            10,
            { filter: `poll_id="${poll_id}"` , sort: '-created' , expand: 'author' }
        ) as any as PocketBasePageResponse<Comment>
    
        if(data) data.items = data.items.map(item => {
            
            const new_item = item
    
            if(!new_item.expand) return item
    
            new_item.expand.author = {
                ...new_item.expand.author,
                avatar: db.getFileUrl(new_item.expand.author , new_item.expand.author.avatar)
            }
    
            return new_item
        })

        return data
    })
}