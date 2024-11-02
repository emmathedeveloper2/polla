<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import { enhance } from '$app/forms';
	import { handleEnhance } from '$lib/enhance';
	import type { ActionData, PageData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import Avatar from '$lib/components/avatar.svelte';
	import { Loader2 } from 'lucide-svelte';

	type $$Props = {
		form: ActionData;
		data: PageData;
	};

	const { form, data }: $$Props = $props();

    let base64Avatar: string | undefined = $state.raw(data.user.avatar)

	let submitting = writable(false);

    const file_input: Writable<HTMLInputElement | undefined> = writable(undefined)

    const generate_base64_avatar = async (e: any) => {
        const file = e.target?.files?.[0]

        const reader = new FileReader()

        if(!file) return base64Avatar = undefined

        reader.readAsDataURL(file)

        reader.onload = (e: any) => {
            base64Avatar = e.target.result
        }
    }
</script>

<MaxWidthWrapper class="size-full">
	<div class="flex size-full flex-col items-center justify-center gap-4 p-4">
		<h1 class="text-3xl font-bold">Your Profile</h1>

		{#if !$submitting && form?.error}
			<div
				class="flex w-full items-center justify-center rounded border border-red-500 bg-red-200 p-2 text-red-500"
			>
				{form.error}
			</div>
		{/if}

		<form
			use:enhance={(_) => handleEnhance(submitting)}
			method="post"
            enctype="multipart/form-data"
			class="flex w-full flex-col items-center gap-4 md:w-[400px]"
		>   
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div onclick={_ => $file_input?.click()} class="flex flex-col items-center gap-4 size-[100px] cursor-pointer">
                <Avatar class="size-full" avatar={base64Avatar} name={data.user.name} />
            </div>

            <input bind:this={$file_input} type="file" name="avatar" class="hidden" accept="image/*" onchange={generate_base64_avatar} />

			<input
				type="text"
				name="name"
				required
				placeholder="username"
				class="w-full rounded bg-gray-50 p-2 outline-none"
				value={data.user.name}
			/>

			<button
				disabled={$submitting}
				class="flex w-full items-center justify-center rounded bg-lime-500 p-2 text-white disabled:opacity-50"
			>
				{#if $submitting}
					<Loader2 class="animate-spin" />
				{:else}
					Update Profile
				{/if}
			</button>

			{#if !$submitting}
				<a
					href="/feed"
					class="flex w-full items-center justify-center rounded bg-gray-200 p-2 text-black disabled:opacity-50"
				>
					Back to Feed
				</a>
			{/if}
		</form>
	</div>
</MaxWidthWrapper>
