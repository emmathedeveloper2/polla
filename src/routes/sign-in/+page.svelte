<script lang="ts">
	import { enhance } from '$app/forms';
	import { handleEnhance } from '$lib/enhance';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import GoogleIcon from '$lib/components/authicons/google.svelte'
	import GitHubIcon from '$lib/components/authicons/github.svelte'
	import type { ActionData, PageData } from './$types';
	import { writable } from 'svelte/store';
	import { Loader, Loader2 } from 'lucide-svelte';

	type $$Props = {
		data: PageData;
		form: ActionData;
	};

	const submitting = writable(false);

	const { data, form }: $$Props = $props();
</script>

<svelte:head>
    <title>Polla | Sign In</title>

	<meta name="og:url" content="https://polla-app.netlify.app" />
	<meta name="og:title" content="Polla" />
	<meta name="og:description" content="Get on this poll" />
	<meta name="og:type" content="website" />
	<meta name="og:image" content="https://polla-app.netlify.app/images/twitter_opengraph_light.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="polla-app.netlify.app" />
	<meta property="twitter:url" content="https://polla-app.netlify.app" />
	<meta name="twitter:title" content="Polla" />
	<meta name="twitter:description" content="Get on this poll" />
	<meta
		name="twitter:image"
		content="https://polla-app.netlify.app/images/twitter_opengraph_light.png"
	/>
</svelte:head>

<MaxWidthWrapper class="size-full">
	<div class="flex flex-col items-center justify-center gap-4 size-full p-4">

		<form action="?/google" method="post" class="flex flex-col gap-4 w-full md:w-[400px]">
			<button class="w-full rounded border border-gray-200 p-2 flex items-center justify-center gap-2">
				<GoogleIcon size="20" />
				Sign in with Google
			</button>

			<button formaction="?/github" class="w-full rounded border border-gray-200 p-2 flex items-center justify-center gap-2">
				<GitHubIcon size="20" />
				Sign in with GitHub
			</button>
		</form>
	</div>
</MaxWidthWrapper>
