<script lang="ts">
    type $$Props = {
        avatar?: string,
        name?: string,
        class?: string
    }

    let { avatar , name , class: className } : $$Props = $props()
</script>

<div class="size-[40px] rounded-full overflow-hidden grid place-items-center bg-gray-100 text-gray-500 select-none {className}">
    {#if !!avatar}
        <img src={avatar} alt="avatar" class="size-full object-cover"/>
        {:else}
        <b class="uppercase">{name?.substring(0 , 1)}</b>
    {/if}
</div>