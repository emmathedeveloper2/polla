<script lang="ts">
	import { Send } from 'lucide-svelte';
    import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte';
	import { text } from '@sveltejs/kit';

    const dispatch = createEventDispatcher()

    let value = $state('')

    const handle_submit = async (e: SubmitEvent) => {

        e.preventDefault()

        const request_data = Object.fromEntries(new FormData(e.target as any))

        console.log(request_data)

        try {
            const response = await fetch(`/api/polls/comment/${$page.params.id}` , {
                method: 'POST',
                body: JSON.stringify(request_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const res = await response.json()

            dispatch('submit' , res.data)

            value = ''
        } catch (error) {
            
        }
    }
</script>

<form onsubmit={handle_submit} class="flex w-full gap-2 bg-gray-200 rounded px-4 items-center">
    <input 
        name="text" 
        placeholder="What's your take?"
        class="flex-1 resize-none outline-none bg-transparent p-4"
        type="text"
        autocomplete="off"
        spellcheck="false"
        bind:value={value}
    />

    <button class="text-gray-500">
        <Send size={24}/>
    </button>
</form>
