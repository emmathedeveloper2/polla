<script lang="ts">
	import type { PageData } from "./$types";

    
    type $$Props = {
        data: PageData,
    }

    let { data } : $$Props = $props()
</script>

<div class="flex flex-col items-center justify-center w-full h-full p-2 gap-4">
    {#if data.sucess}
        <h1 class="text-3xl font-bold">Email verified</h1>
    {:else if data.error}
        <h1 class="text-3xl font-bold">Oop's seems like this link is invalid or the token has expired.</h1>
    {/if}

    <a href="/feed" class="font-bold text-center bg-lime-500 text-white rouned w-full md:w-[400px] p-2 flex items-center justify-center rounded">
        Go to feed
</div>