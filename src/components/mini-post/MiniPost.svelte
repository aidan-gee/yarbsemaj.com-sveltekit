<script>
	import dayjs from 'dayjs';
	export let id;
	export let title;
	export let description;
	export let image;
	export let createdDate;
	export let status;

	export let admin = false;
</script>

<a sveltekit:prefetch class="text-reset text-decoration-none" href={`/blog/${admin ? 'admin/' : ''}${id}`}>
	<div class={`card mt-3 ${status === 'draft' ? 'bg-warning' : ''}`}>
		<div style="background-image: url('{image}');" class="card-img-top" alt={title} />
		<div class="card-body">
			<h4 class="card-title">{title}</h4>
			<p class="card-text">
				{description}
			</p>
		</div>
		<div class="card-footer text-end">
			{dayjs(createdDate).format('DD MMM YYYY')}
		</div>
	</div>
</a>

<style type="scss">
	@import './MiniPost.scss';

	.card-img-top {
		background-position: center;
		background-size: cover;
		background-color: #aaaaaa;
	}
</style>
