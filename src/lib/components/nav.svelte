<script lang="ts">
	import MaxWidthWrapper from './max-width-wrapper.svelte';
	import { page } from '$app/stores';
	import Avatar from './avatar.svelte';
	import { profile_menu_open } from './profile-menu.svelte';
</script>

<MaxWidthWrapper>
	<nav class="flex w-full items-center justify-between">
		<a href="/" class="size-[60px]">
			<img src="/favicon.svg" alt="logo" class="size-full object-cover" />
		</a>

		{#if $page.url.pathname == '/feed' && $page.data}
			{@const { verified } = $page.data.user}

			{#if verified}
				<a href="/feed/create" class="rounded bg-lime-500 px-4 py-2 text-white">Create a Poll</a>
			{/if}
		{/if}

		<div class="flex items-center gap-2">
			{#if $page.url.pathname == '/'}
				<a href="/sign-in" class="w-max rounded bg-lime-500 px-4 py-2 text-white"> Sign In </a>
			{/if}

			{#if $page.url.pathname == '/feed' && $page.data}
				{@const { username, avatar } = $page.data.user}

				<button on:click={(_) => profile_menu_open.set(true)} class="cursor-pointer">
					<Avatar {username} {avatar} />
				</button>
			{/if}
		</div>
	</nav>
</MaxWidthWrapper>
