<script lang="ts">
	import type { Snippet } from "svelte";

    type $$Props = {
        children: Snippet<[]>
        class?: string
    }

    let { children , class: className } : $$Props = $props();
</script>

<div class="w-full {className}">
    <div class="max-w-[1440px] h-full mx-auto px-4 sm:px-6 lg:px-8">
        {@render children()}
    </div>
</div>