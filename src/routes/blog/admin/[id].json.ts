import { api } from '../_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// get /blog/:id.json
export const get: RequestHandler<Locals> = async (request) => {
	return await api(request, `posts/${request.params.id}/edit`)
};

// POST /blog/admin/:id.json
export const put: RequestHandler<Locals> = async (request) => {
	const response = await api(request, `posts/${request.params.id}`, request.body);
	return response;
};

// DELETE /blog/admin/:id.json
export const del: RequestHandler<Locals> = async (request) => {
	const response = await api(request, `posts/${request.params.id}`);
	return response;
};
