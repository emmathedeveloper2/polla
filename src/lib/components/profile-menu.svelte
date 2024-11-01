<script context="module">
	export const profile_menu_open = writable(false);
</script>

<script lang="ts">
	import { LogOutIcon , PencilIcon } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores'
	import Avatar from './avatar.svelte';
</script>

{#if $profile_menu_open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		on:click|self={(_) => profile_menu_open.set(false)}
		class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50 p-2 backdrop-blur"
	>
		<div class="flex w-full flex-col items-center justify-center gap-2 md:w-[400px]">
			<form action="?/logout" method="post" class="w-full p-2 bg-white rounded shadow-lg flex items-center flex-col gap-4">
				{#if $page.data.user}
					{@const { username, avatar } = $page.data.user}

					<Avatar {avatar} {username}/>

					<p>{username}</p>
				{/if}

				<a
					href="/profile"
					class="flex w-full items-center justify-center gap-4 rounded bg-gray-100 p-2 text-black disabled:opacity-50"
				>
					<p>Edit Profile</p>
					<PencilIcon />
				</a>

				<button
					class="flex w-full items-center justify-center gap-4 rounded bg-lime-500 p-2 text-white disabled:opacity-50"
				>
					<p>Logout</p>
					<LogOutIcon />
				</button>
			</form>
		</div>
	</div>
{/if}
