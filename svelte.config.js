import preprocess from 'svelte-preprocess';
import serverless from '@yarbsemaj/adapter-lambda';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),


	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: serverless(),
	},

};

export default config;
