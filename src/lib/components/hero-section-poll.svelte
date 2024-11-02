<script lang="ts">
	import { MessageCircle, ChartBarIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';

	const active = 1;

	const options = $state([
		{
			id: 2,
			text: 'Dislike it 🤮',
			votes: 1
		},
		{
			id: 1,
			text: 'It is Awesome!! 😍',
			votes: 2
		},
		{
			id: 3,
			text: "I haven't used it",
			votes: 1
		}
	]);

	const total_votes = $derived(options.reduce((prev, curr) => prev + curr.votes, 0));

	const calculate_width = (votes: number) => Math.floor((votes * 100) / total_votes);

	const update_poll = () => {
		const random_option = options[Math.floor(Math.random() * options.length)];

		random_option.votes += 1;
	};

	onMount(() => {
		const interval = setInterval(update_poll, 3000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex w-full flex-col gap-4 rounded border border-gray-200 p-2">
	<p>What do you think about Polla?</p>

	{#each options as option}
		{@const percentage = calculate_width(option.votes) + '%'}
		<div
			class="relative z-0 flex h-[50px] w-full items-center justify-between gap-2 overflow-hidden rounded px-2"
		>
			<div
				style:width={percentage}
				class="absolute inset-0 -z-10 h-full {option.id == active
					? 'bg-lime-200'
					: 'bg-lime-50'} transition-all"
			></div>
			<p>{option.text}</p>

			<small class={option.id == active ? 'text-lime-600' : 'text-lime-900'}>{percentage}</small>
		</div>
	{/each}

	<div class="body-text flex items-center gap-4">
		<p class="flex select-none items-center gap-[5px] px-2">
			<ChartBarIcon />
			{#key total_votes}
				<span in:scale>{total_votes}</span>
			{/key}
		</p>
		<p class="flex cursor-pointer items-center gap-2 px-2"><MessageCircle /> 6</p>
	</div>
</div>
