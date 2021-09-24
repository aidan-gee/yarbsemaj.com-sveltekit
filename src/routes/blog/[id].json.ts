import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// get /blog/:id.json
export const get: RequestHandler<Locals> = async (request) => {
	let response = await api(request, `posts/${request.params.id}`)
	response.headers = { "cache-control": "max-age=86400"};
	return response
};
