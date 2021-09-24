<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import Post from '../../components/post/Post.svelte';

	export const load: Load = async ({ fetch, page }) => {
		const res = await fetch(`/blog/${page.params.id}.json`, { credentials: 'omit' });

		if (res.ok) {
			const post = await res.json();

			return {
				props: { post },
				maxage: 86400
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
</svelte:head>

<div class="row justify-content-md-center">
	<div class="col col-lg-7">
		<Post {post} />
	</div>
</div>
