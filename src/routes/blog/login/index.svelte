<script context="module" lang="ts">
	export const prerender = true;
</script>

<script>
	import { addAlert } from '../../../stores/alerts.js';
	import { goto } from '$app/navigation';

	let form = {
		uname: '',
		password: ''
	};

	async function login(event) {
		event.preventDefault();
		let token = btoa(`${form.uname}:${form.password}`);
		try {
			let login = await fetch(`/blog/login.json`, {
				method: 'POST',
				body: JSON.stringify({ token }),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (login.status !== 200) {
				throw 'login-error';
			}
			goto('/blog/admin/');
		} catch (e) {
			addAlert('Login Error', 'danger');
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="row justify-content-md-center">
	<div class="col col-lg-5 d-flex flex-column justify-content-center">
		<div class="card">
			<div class="card-body">
				<form on:submit={login}>
					<h1 class="h3 mb-3 fw-normal">Please sign in</h1>
					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							id="floatingInput"
							placeholder="username"
							bind:value={form.uname}
						/>
						<label for="floatingInput">Username</label>
					</div>
					<div class="form-floating">
						<input
							type="password"
							class="form-control"
							id="floatingPassword"
							placeholder="Password"
							bind:value={form.password}
						/>
						<label for="floatingPassword">Password</label>
					</div>
					<button type="submit" class="w-100 btn btn-lg btn-primary mt-3">Sign in</button>
				</form>
			</div>
		</div>
	</div>
</div>
