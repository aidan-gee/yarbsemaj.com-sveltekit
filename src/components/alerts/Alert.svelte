<script>
	import { onMount } from "svelte";
	import { hideAlert } from "../../stores/alerts";

	export let index;
	export let text;
	export let type;
	let timeout;
	onMount(async () => {
		timeout = setTimeout(() => hideAlert(index), 4000);
	});

	function dismiss() {
		clearTimeout(timeout);
		hideAlert(index);
	}
</script>

<div class="alert alert-{type} alert-dismissible fade show" role="alert">
	{text}
	<button
		on:click={dismiss}
		type="button"
		class="btn-close"
		aria-label="Close"
	/>
</div>
