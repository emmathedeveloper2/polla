<script lang="ts">
	import type { Comment } from "$lib/types";
	import Avatar from "./avatar.svelte";

    
    type $$Props = {
        comment: Comment
    }

    let { comment } : $$Props = $props()
</script>

<div class="w-full p-2 flex gap-4">
    {#if comment.expand?.author}
        {@const { avatar , name } = comment.expand?.author}

        <Avatar {avatar} {name}/>

        <div>
            <b>{name}</b>
            <p>{comment.text}</p>
        </div>
    {/if}
</div>