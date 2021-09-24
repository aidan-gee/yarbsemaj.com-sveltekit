import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = 'https://yarbsemaj.com/blog/api';

export async function api(request: Request<Locals>, resource: string, data?: {}) {

	let token = request.locals.userid;

	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
			Authorization: token ? `Basic ${token}` : undefined
		},
		body: data && JSON.stringify(data)
	});

	return {
		headers: { 'cache-control': 'no-store' },
		status: res.status,
		body: await res.json()
	};
}

export async function login(request: Request<Locals>, resource: string, token: string) {

	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
			Authorization: token ? `Basic ${token}` : undefined
		},
	});

	return {
		status: res.status,
		body: await res.json()
	};
}
