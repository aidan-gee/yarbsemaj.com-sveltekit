import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import cookie from 'cookie';
import { login } from '../_api';



// GET /blog/login.json
export const get: RequestHandler<Locals> = async (request) => {
	return {
		status: 200,
		body: { "isLogedIn": !!request.locals.userid }
	};
};


// POST /blog/login.json
export const post: RequestHandler<Locals> = async (request) => {
	let token = request.body.token;
	if (!token) {
		return {
			status: 403,
		}
	}

	const response = await login(request, `login`, token);

	if (response.status !== 200) {
		return {
			status: 403,
		}
	}

	return {
		body: { "isLogedIn": true },
		headers: {
			'set-cookie': cookie.serialize('userid', token, {
				path: '/',
				httpOnly: true
			})
		}
	};
};

// del /blog/login.json
export const del: RequestHandler<Locals> = async (request) => {
	return {
		body: { "isLogedIn": true },
		headers: {
			'set-cookie': cookie.serialize('userid', '', {
				path: '/',
				httpOnly: true,
				expires: new Date(0)
			})
		}
	};
};
