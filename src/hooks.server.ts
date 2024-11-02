import type { Handle } from '@sveltejs/kit';
import { create_db_instance } from './lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = create_db_instance();

	event.locals.db.authStore.loadFromCookie(event.cookies.get('auth') || '');

	try {
		if (event.locals.db.authStore.isValid) {
			await event.locals.db.collection('users').authRefresh();
		}
	} catch (_) {
		event.locals.db.authStore.clear();
	}

	if (event.locals.db.authStore.isValid) {
		event.locals.user = event.locals.db.authStore.model as any;
	}

    event.cookies.set('auth', event.locals.db.authStore.exportToCookie(), {
        sameSite: 'lax',
        path: '/'
    });

	const response = await resolve(event);

	return response;
};
