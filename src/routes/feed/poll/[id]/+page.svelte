<script lang="ts">
	import CommentBox from '$lib/components/comment-box.svelte';
	import CommentInput from '$lib/components/comment-input.svelte';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import PollBox from '$lib/components/poll-box.svelte';
	import type { PageData } from './$types';

	type $$Props = {
		data: PageData;
	};

	let { data }: $$Props = $props();

	let comments = $state(data.comments?.items ?? []);
</script>

<svelte:head>
	<title>Polla | {data.poll.caption}</title>
	<meta name="description" content="Create and Take Polls with Ease." />

	<meta name="og:url" content="https://polla-app.netlify.app" />
	<meta name="og:title" content={data.poll.caption} />
	<meta name="og:description" content="Get on this poll" />
	<meta name="og:type" content="website" />
	<meta name="og:image" content="https://polla-app.netlify.app/images/twitter_opengraph_dark.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="polla-app.netlify.app" />
	<meta property="twitter:url" content="https://polla-app.netlify.app" />
	<meta name="twitter:title" content="{data.poll.caption}" />
	<meta name="twitter:description" content="Get on this poll" />
	<meta
		name="twitter:image"
		content="https://polla-app.netlify.app/images/twitter_opengraph_dark.png"
	/>
</svelte:head>

<MaxWidthWrapper class="size-full">
	<div class="flex size-full flex-col items-center p-2">
		<div class="flex w-full flex-1 flex-col">
			<PollBox poll={data.poll} />
			<h1 class="text-xl font-bold">Comments</h1>
			{#if data.comments}
				{#each comments as comment}
					<CommentBox {comment} />
				{/each}
			{/if}
		</div>
		<CommentInput on:submit={(e) => comments.unshift(e.detail)} />
	</div>
</MaxWidthWrapper>
