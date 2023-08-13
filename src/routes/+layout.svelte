<script>
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import axios from 'axios';
	export const prerender = false;
	export const ssr = false;

	axios.defaults.baseURL = `${PUBLIC_API_BASE_URL.replace(/\/$/, '')}`;
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
