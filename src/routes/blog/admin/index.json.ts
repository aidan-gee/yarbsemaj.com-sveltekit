import { api } from '../_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET /blog/admin.json
export const get: RequestHandler<Locals> = async (request) => {
	const response = await api(request, `posts/all`, undefined);
	return response;
};

// POST /blog/admin.json
export const post: RequestHandler<Locals> = async (request) => {
	const response = await api(request, `posts`, request.body);
	return response;
};

