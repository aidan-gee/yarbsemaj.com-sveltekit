<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import MiniPost from '../../components/mini-post/MiniPost.svelte';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/blog.json', {credentials: 'omit'});

		if (res.ok) {
			const posts = await res.json();

			return {
				props: { posts },
				maxage: 86400
			};
		}

		return {
			status: res.status
		};
	};
</script>

<script>
	export let posts;
	let published = posts.published;
</script>

<svelte:head>
	<title>James Dev Blog</title>
	<meta name="description" content="A blog for all things techy." />
</svelte:head>

<div class="row justify-content-md-center">
	<div class="col col-lg-6">
		{#each published as item}
			<MiniPost {...item} />
		{/each}
	</div>
</div>
