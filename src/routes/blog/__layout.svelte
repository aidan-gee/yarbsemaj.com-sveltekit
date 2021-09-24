<script>
	import Footer from '../../components/footer/Footer.svelte';
	import AlertList from '../../components/alerts/AlertList.svelte';
	import { afterUpdate } from 'svelte';

	let isLogedIn = false;
	afterUpdate(async () => {
		const res = await fetch('/blog/login.json');
		isLogedIn = (await res.json()).isLogedIn;
	});
</script>

<div class="container">
	<div class="row justify-content-md-center">
		<AlertList />

		<div class="col col-lg-7 mt-3">
			<a sveltekit:prefetch class="text-reset text-decoration-none" href={isLogedIn ? '/blog/admin' : '/blog/'}>
				<h1 class="display-3 py-2 text-center">
					James' Dev Blog <img style="height: 1em; width: 1em" alt="logo" src={'/img/logo.svg'} />
				</h1>
			</a>
		</div>
	</div>
	<main>
		<slot />
	</main>
	<Footer {isLogedIn} />
</div>
