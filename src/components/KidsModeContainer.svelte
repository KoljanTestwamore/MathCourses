<script lang="ts">

</script>

<div class="container">
    <div class="content">
        <slot></slot>
    </div>
</div>

<style lang="sass">
    .container
        width: 100%
        height: 100%
        background: #003EDD
        opacity: .6
        box-sizing: border-box
        padding: 80px

        & .content
            width: 100%
            height: 100%
            background: #fff   
        
</style>