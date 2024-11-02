import { get_paginated_polls } from '$lib/server/db.js';
import { json, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	let [ polls , err ] = await get_paginated_polls(locals.db);

    if(!polls || err) return { error: 'Something went wrong' }

	return {
		polls
	};
};

export const actions = {
	logout: async ({ locals, cookies }) => {
		locals.db.authStore.clear();

		locals.user = undefined;

		cookies.delete('auth', { path: '/' });

		return redirect(302, '/');
	}
};
