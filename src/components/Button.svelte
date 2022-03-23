<script lang="ts">
    export let onclick = () => {}
    export let className = "";
    export let isActive = true;
</script>

<button class={"button " + className + (!isActive ? " inactive" : "")} on:click={isActive && onclick}>
    <slot></slot>
</button>

<style lang="sass">
    .button
        background-color: #C6F5DB
        border-radius: 20px
        width: 200px
        cursor: pointer
        border: none

        &.inactive
            background-color: gray
</style>