<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import MiniPost from '../../../components/mini-post/MiniPost.svelte';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/blog/admin.json');

		if (res.ok) {
			const posts = await res.json();
			return {
				props: { posts },
				maxage: 1
			};
		} else {
			return {
				status: res.status
			};
		}
	};
</script>

<script>
	export let posts;
	let published = posts.published;
	let drafts = posts.draft || [];
</script>

<svelte:head>
	<title>Post List</title>
</svelte:head>

<div class="row justify-content-md-center">
	<div class="col col-lg-6">
		<a href="/blog/admin/new" sveltekit:prefetch class="text-reset text-decoration-none">
			<div class="card bg-primary mt-3 new-post">
				<div
					style="background-image: url('/img/new-post.jpeg');"
					class="card-img-top"
					alt={'newPost'}
				/>
				<div class="card-body">
					<h4 class="card-title">Create a new post...</h4>
				</div>
			</div>
		</a>
		{#each drafts as item}
			<MiniPost {...item} admin={true} />
		{/each}
		{#each published as item}
			<MiniPost {...item} admin={true} />
		{/each}
	</div>
</div>

<style>
	.new-post .card-img-top {
		height: 350px;
		background-position: center;
		background-size: cover;
		background-color: #aaaaaa;
	}
</style>
