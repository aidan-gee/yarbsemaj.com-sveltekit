import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET /blog.json
export const get: RequestHandler<Locals> = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const response = await api(request, `posts`);
	response.headers = { "cache-control": "max-age=86400" };

	return response;
};
