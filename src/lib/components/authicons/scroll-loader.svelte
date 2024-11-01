<script lang="ts">
	import type { Snippet } from "svelte";


    type $$Props = {
        children: Snippet<[]>
    }
    
    let { children } : $$Props = $props()
</script>

<div class="scroll-area overflow-auto w-full md:w-[500px]">
    {@render children()}
</div>

<style>
    .scroll-area {
        height: calc(100vh - 80px)
    }
</style>