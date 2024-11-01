<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';
	import '@fontsource-variable/bricolage-grotesque';
	let { children } = $props();
</script>

<div class="w-full h-screen flex flex-col">
	<Nav />
	<div class="flex-1 w-full">
		{@render children()}
	</div>
</div>
