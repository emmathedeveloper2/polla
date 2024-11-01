<script lang="ts">
	import type { Option, Poll } from '$lib/types';
	import { ChartBarIcon, MessageCircle, EyeIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import Avatar from './avatar.svelte';

	type $$Props = {
		poll: Poll<Option[]>;
	};

	let { poll }: $$Props = $props();

	let options: Option[] = $state.raw(poll.options);

	let active: number | undefined = $derived(options.find(o => o.votes.includes($page.data.user?.id))?.id)

	const total_votes = $derived(options.reduce((prev, curr) => prev + curr.votes.length, 0));

	const calculate_width = (votes: number) =>
		total_votes < 1 ? 0 : Math.floor((votes * 100) / total_votes);

	const handle_vote = async (option: Option) => {

		try{

			let response = await fetch(`/api/polls/vote/${poll.id}/${option.id}` , { method: 'POST' })

			const res  = await response.json()

			if(res.data) {
				options = res.data.options
			}

		}catch(error){

		}
	}
</script>

<div class="mb-4 flex w-full flex-col gap-4 rounded border border-gray-200 p-2 *:select-none">
	{#if poll.expand}
		{@const { avatar, username, id } = poll.expand.author}
		<div class="flex items-center gap-2">
			<Avatar {avatar} {username} />
			<p>{$page.data.user?.id == id ? 'You' : username}</p>
		</div>
	{/if}

	<p>{poll.caption}</p>

	{#each options as option}
		{@const percentage = calculate_width(option.votes.length) + '%'}
		<button
			onclick={_ => handle_vote(option)}
			class="relative z-0 flex h-[50px] w-full cursor-pointer items-center justify-between gap-2 overflow-hidden rounded bg-gray-50 px-2"
		>
			<div
				style:width={percentage}
				class="absolute inset-0 -z-10 h-full {option.id == active
					? 'bg-lime-200'
					: 'bg-lime-50'} transition-all"
			></div>
			<p>{option.title}</p>

			<small class={option.id == active ? 'text-lime-600' : 'text-lime-900'}>{percentage}</small>
		</button>
	{/each}

	<div class="body-text flex items-center gap-4">
		<p title="votes" class="flex select-none items-center gap-[5px] px-2">
			<ChartBarIcon />
			{#key total_votes}
				<span in:scale>{total_votes}</span>
			{/key}
		</p>
		<a
			href="/feed/poll/{poll.id}"
			title="comments"
			class="flex cursor-pointer items-center gap-2 px-2"
		>
			<MessageCircle />
			<span>
				{poll.total_comments}
			</span>
		</a>
	</div>
</div>
