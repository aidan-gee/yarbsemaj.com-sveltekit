<script>
	import SvelteMarkdown from 'svelte-markdown';
	import dayjs from 'dayjs';
	import Fa from 'svelte-fa';
	import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
	import Blockquote from '../markdown/Blockquote.svelte';
	import Code from '../markdown/Code.svelte';
	import Image from '../markdown/Image.svelte';
	import Table from '../markdown/Table.svelte';
	export let post;

	let renders = {
		image: Image,
		table: Table,
		blockquote: Blockquote,
		code: Code
	};
</script>

<div class="card mt-2 blog-post">
	<div
		style="background-image: url('{post.image}'); ;"
		class="card-img-top post-image"
		alt={post.title}
	/>
	<div class="card-body">
		<h1 class="card-title">{post.title}</h1>
		<div class="text-muted mb-3">
			<div class="d-flex justify-content-between">
				<div>Posted by James Bray</div>
				<div>
					<Fa icon={faCalendarDay} />
					{dayjs(post.createdDate).format('DD MMM YYYY')}
				</div>
			</div>
		</div>
		<p class="card-text">
			<SvelteMarkdown renderers={renders} source={post.body} />
		</p>
	</div>
</div>

<style type="scss">
	@import './Post.scss';

	.post-image {
		background-position: center;
		background-size: cover;
		background-color: #aaaaaa;
	}
</style>
