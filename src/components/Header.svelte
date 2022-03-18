<script lang="ts">
    import { locale, toggleLanguage, } from "../stores";

</script>

<nav class="navigation">
    <div class="logo">
        Math Courses
    </div>
    <div>
        <!-- <button on:click={toggleLanguage}>{locale('🇷🇺', '🇬🇧')}</button> -->
        <a href="/">{locale('Блог', 'Blog')}</a>
        <a href="/">{locale('Войти', 'Login')}</a>
    </div>
</nav>

<style lang="sass">
    .navigation 
        display: flex
        justify-content: space-between
        padding: 10px

        .logo
            font-weight: 1000

        a:not(:last-child)
            margin-right: 8px
</style>