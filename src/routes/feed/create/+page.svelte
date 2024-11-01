<script lang="ts">
	import { goto } from '$app/navigation';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import { MinusIcon, PlusIcon , Loader2Icon } from 'lucide-svelte';

	type SubmitionState = 'error' | 'success' | 'idle' | 'loading';

	let options = $state([
		{
			id: 1,
			title: '',
			votes: []
		},
		{
			id: 2,
			title: '',
			votes: []
		}
	]);

	let state: SubmitionState = $state('idle');

	const handle_submit = async (e: SubmitEvent) => {
		e.preventDefault();

		state = 'loading';

		const form_data = new FormData(e.target as HTMLFormElement);

		const { caption } = Object.fromEntries(form_data);

		if (!caption || options.length < 2) return;

		try {
			const poll = {
				caption,
				options: options.map((option) => ({
					id: option.id,
					title: option.title,
					votes: []
				}))
			};

			const response = await fetch('/api/polls', {
				method: 'POST',
				body: JSON.stringify(poll)
			});

			const data = await response.json();

			state = data.success ? 'success' : 'error';

			if(data.success) goto('/feed')
		} catch (error) {
			state = 'error';
		}
	};
</script>

<svelte:head>
    <title>Polla | Create</title>
	<meta name="description" content="Create a new poll">
</svelte:head>

<MaxWidthWrapper class="size-full">
	<div class="flex max-h-full w-full flex-col items-center justify-center overflow-auto">
		<form onsubmit={handle_submit} class="flex w-full flex-col items-center gap-4 md:w-[500px]">
			<h1 class="w-full text-3xl font-bold md:text-5xl">Create a Poll</h1>

			{#if state == 'error'}
				<div
					class="flex w-full items-center justify-center rounded border border-red-500 bg-red-200 p-2 text-red-500"
				>
					Something went wrong.
				</div>
			{/if}

			<textarea
				name="caption"
				id="caption"
				rows="4"
				class="w-full resize-none rounded-md border border-gray-300 p-2 focus:border-lime-500 focus:outline-none"
				placeholder="What's your poll about?"
				required
			></textarea>

			{#each options as option, idx}
				<div
					class="flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 p-2"
				>
					<input
						type="text"
						name="option_{option.id}"
						id="option"
						class="w-full rounded-md p-2 focus:outline-none"
						placeholder="Option {idx + 1}"
						bind:value={option.title}
						required
					/>

					{#if options.length > 1}
						<button
							type="button"
							onclick={(_) => options.splice(idx, 1)}
							class="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 p-2 text-black hover:bg-gray-200"
						>
							<MinusIcon size={20} />
						</button>
					{/if}
				</div>
			{/each}

			<button
				type="button"
				onclick={(_) => options.push({ id: options.length + 1, title: '', votes: 0 })}
				class="flex w-full items-center justify-center gap-4 rounded-md bg-gray-100 p-2 text-black hover:bg-gray-200"
			>
				<PlusIcon size={20} />
				Add Option
			</button>

			{#if options.length > 1}
				<button disabled={state == 'loading'} class="w-full rounded-md bg-lime-500 p-2 text-white disabled:opacity-50 flex items-center justify-center">
					{#if state == 'loading'}
						<Loader2Icon class="animate-spin"/>
						{:else}
						Create
					{/if}
				</button>
			{/if}
		</form>
	</div>
</MaxWidthWrapper>
