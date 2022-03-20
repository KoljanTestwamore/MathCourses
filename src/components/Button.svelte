<script lang="ts">
    export let onclick = () => {}
    export let className = ""
</script>

<button class={"button " + className} on:click={onclick}>
    <slot></slot>
</button>

<style lang="sass">
    .button
        background-color: #EBB2E5
        border-radius: 20px
        width: 200px
        cursor: pointer
</style>