<script>
	import HeroSectionPoll from '$lib/components/hero-section-poll.svelte';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';	
</script>

<svelte:head>
    <title>Polla</title>
	<meta name="description" content="Create and Take Polls with Ease.">

	<meta name="og:url" content="https://polla.netlify.app" />
	<meta name="og:title" content="Polla" />
	<meta name="og:description" content="Create and Take Polls with Ease." />
	<meta name="og:type" content="website" />
	<meta name="og:image" content="/images/twitter_opengraph_dark.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="polla.netlify.app" />
	<meta property="twitter:url" content="https://polla.netlify.app" />
	<meta name="twitter:title" content="Polla" />
	<meta name="twitter:description" content="Create and Take Polls with Ease." />
	<meta
		name="twitter:image"
		content="/images/twitter_opengraph_dark.png"
	/>
</svelte:head>

<MaxWidthWrapper class="h-full">
	<div class="flex flex-col lg:flex-row size-full">
		<div class="flex h-full flex-1 flex-col items-center justify-center gap-2 md:gap-8">
			<h1 class="text-3xl font-bold md:text-5xl lg:text-7xl">Create and Take Polls with Ease.</h1>
			<p class="text-xl md:text-3xl lg:text-5xl">Connect with people through polls.</p>
		</div>
		<div class="flex flex-1 flex-col items-center justify-center">
			<HeroSectionPoll />
		</div>
	</div>
</MaxWidthWrapper>
