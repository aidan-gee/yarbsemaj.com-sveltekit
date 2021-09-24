<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		let id = page.params.id;
		let post = {};
		if (id !== 'new') {
			const res = await fetch(`/blog/admin/${id}.json`);
			if (res.ok) {
				post = await res.json();
			} else {
				return {
					status: res.status
				};
			}
		} else {
			post = {
				title: '',
				description: '',
				body: '',
				image: `https://picsum.photos/1000/500`
			};
		}

		return {
			props: { post },
			maxage: 1
		};
	};
</script>

<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Post from '../../../components/post/Post.svelte';
	import Fa from 'svelte-fa';
	import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
	import { addAlert } from '../../../stores/alerts';

	export let post;
	export let loading = false;

	let id = $page.params.id;
	let isNew = id === 'new';

	async function commit(status) {
		loading = true;
		if (!isNew) {
			await update(status);
		} else {
			await save(status);
		}
		loading = false;
	}
	async function save(status) {
		post.status = status;
		try {
			let response = await (
				await fetch(`/blog/admin.json`, {
					method: 'POST',
					body: JSON.stringify(post),
					headers: { 'content-type': 'application/json' }
				})
			).json();
			if (!response.id) {
				throw 'save-error';
			}
			addAlert('Post Created', 'success');
			goto(`/blog/admin/${response.id}`);
		} catch (e) {
			addAlert('Failed to create post', 'danger');
		}
	}

	async function deletePost() {
		loading = true;
		try {
			await (
				await fetch(`/blog/admin/${id}.json`, {
					method: 'DELETE'
				})
			).json();

			addAlert('Post Removed', 'success');
			goto(`/blog/admin`);
		} catch (e) {
			addAlert('Failed to remove post', 'danger');
		}
		loading = false;
	}

	async function update(status) {
		post.status = status;
		delete post.id;
		delete post.createdDate;
		try {
			let response = await (
				await fetch(`/blog/admin/${id}.json`, {
					method: 'PUT',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify(post)
				})
			).json();
			if (!response.id) {
				throw 'update-error';
			}

			addAlert(`${post.title} Updated`, 'success');
		} catch (e) {
			addAlert('Failed to update post', 'danger');
		}
	}
</script>

<svelte:head>
	<title>Edit:-{post.title}</title>
	<meta name="description" content={post.description} />
</svelte:head>

<div class="row">
	<div class="col">
		<Post {post} />
	</div>
	<div class="col">
		<form class="d-flex flex-column h-100">
			<div class="mb-3">
				<label for="imageInput" class="form-label">Title</label>
				<input
					required
					id="imageInput"
					class="form-control"
					placeholder="Post title"
					bind:value={post.title}
				/>
			</div>
			<div class="mb-3">
				<label for="imageInput" class="form-label">Short Description</label>
				<textarea required class="form-control" bind:value={post.description} />
			</div>
			<div class="mb-3">
				<label for="imageInput" class="form-label">Hero Image</label>
				<input
					required
					id="imageInput"
					class="form-control"
					placeholder="https://example.com"
					bind:value={post.image}
				/>
			</div>
			<div class="mb-3 flex-grow-1 d-flex flex-column">
				<label required for="imageInput" class="form-label">Body</label>
				<textarea class="form-control flex-grow-1" bind:value={post.body} />
			</div>
			<div class="mb-3 d-flex justify-content-between">
				{#if loading}
					<div class="spinner-border" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				{:else}
					<div class="btn-group" role="group">
						<button type="button" class="btn btn-secondary" on:click={() => commit('draft')}
							>{#if post.status === 'published'}Make Draft{:else}Save Draft{/if}</button
						>
						<button type="button" class="btn btn-info" on:click={() => commit('published')}
							>{#if post.status === 'published'}
								Update{:else if !isNew}Make Public{:else}Publish{/if}</button
						>
					</div>
					{#if !isNew}
						<button type="button" on:click={deletePost} class="btn btn-danger"
							><Fa icon={faTrashAlt} /> Delete</button
						>
					{/if}
				{/if}
			</div>
		</form>
	</div>
</div>
