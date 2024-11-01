<script lang="ts">
	import { Loader2Icon } from "lucide-svelte";


    type SubmitionState = 'error' | 'success' | 'idle' | 'loading'

    let state: SubmitionState = $state('idle')
    
    const handle_submit = async (e: SubmitEvent) => {

        e.preventDefault()
        
        state = 'loading'

        try {
            const response = await fetch("/api/request-verification" , { method: 'POST' })

            const data = await response.json()

            state = data.success ? 'success' : 'error'
        } catch (error) {
            state = 'error'
        }
    }
</script>

<form onsubmit={handle_submit} class="w-full md:w-[500px] h-[300px] relative z-0 rounded-lg overflow-hidden aspect-video">
    <img src="./images/twitter_opengraph_dark.png" alt="polla img" class="size-full object-cover absolute top-0 left-0 -z-10"/>
    <div class="size-full bg-gradient-to-b from-transparent to-black flex flex-col justify-end p-4 gap-2 text-white">

       <button disabled={state === 'loading'} class="w-full rounded bg-white p-2 text-black font-bold text-xl disabled:opacity-50 flex items-center justify-center">
        {#if state === 'loading'}
            <Loader2Icon class='animate-spin'/>
            {:else if state === 'error'}
            Something went wrong
            {:else if state === 'success'}
            Email sent. Check your inbox
            {:else}
            Verify Your Email
        {/if}
        </button>
    </div>
</form>