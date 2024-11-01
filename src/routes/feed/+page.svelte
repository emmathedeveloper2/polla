<script lang="ts">
	import MaxWidthWrapper from "$lib/components/max-width-wrapper.svelte";
	import ProfileMenu from "$lib/components/profile-menu.svelte";
	import VerifyEmailBox from "$lib/components/verify-email-box.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import type { Option, Poll } from "$lib/types";
	import ScrollLoader from "$lib/components/authicons/scroll-loader.svelte";
	import PollBox from "$lib/components/poll-box.svelte";

    type $$Props = {
        data: PageData,
    }
    
    let { data } : $$Props = $props()

    let all_polls: Poll<Option[]>[] = $state.raw([])

    onMount(() => {
        if(data.polls) all_polls = data.polls.items || []
    })
</script>

<svelte:head>
    <title>Polla</title>
	<meta name="description" content="Create and Take Polls with Ease.">
</svelte:head>

<MaxWidthWrapper class='size-full'>
    <div class="w-full p-2 flex flex-col items-center">
        {#if !data.user.verified}
            <div class="size-full grid place-items-center">
                <VerifyEmailBox />
            </div>
            {:else}
            <ScrollLoader>
                {#each all_polls as poll}
                    <PollBox {poll}/>
                {/each}
            </ScrollLoader>
        {/if}
    </div>
</MaxWidthWrapper>

<ProfileMenu />