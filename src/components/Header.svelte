<script lang="ts">
    import { locale, toggleLanguage, } from "../stores";
import Label from "./Label.svelte";

</script>

<nav class="navigation">
    <div class="logo">
        Math Courses
    </div>
    <div>
        <!-- <button on:click={toggleLanguage}>{locale('🇷🇺', '🇬🇧')}</button> -->
        <a href="/"><Label values={["О НАС", "ABOUT US"]}/></a>
        <a href="/"><Label values={["КОНТАКТЫ", "CONTACTS"]}/></a>
        <a href="/"><Label values={["ВОЙТИ", "LOG IN"]}/></a>
    </div>
</nav>

<style lang="sass">
    .navigation 
        display: flex
        justify-content: space-between
        align-items: center
        background-color: #EBB2E5
        height: 74px
        font-size: 18px
        padding: 0 40px

        .logo
            font-weight: 1000

        a
            text-decoration: none
            color: #000

            &:not(:last-child)
                margin-right: 8px
</style>