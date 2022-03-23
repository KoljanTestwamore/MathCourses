<script lang="ts">
    import { Link } from "svelte-routing";
    import { locale, toggleLanguage, } from "../stores";
    import Label from "./Label.svelte";

</script>

<nav class="navigation">
    <div class="logo">
        EnglishMath
    </div>
    <div>
        <a href="/"><Label values={["О НАС", "ABOUT US"]}/></a>
        <a href="/"><Label values={["КОНТАКТЫ", "CONTACTS"]}/></a>
        <Link to="/MathCourses/game"><Label values={["ВОЙТИ", "LOG IN"]}/></Link>
    </div>
</nav>

<style lang="sass">
    .navigation 
        display: flex
        justify-content: space-between
        align-items: center
        height: 64px
        font-size: 16px
        padding: 0 150px

        .logo
            font-size: 24px

        a
            text-decoration: none
            color: #000

            &:not(:last-child)
                margin-right: 24px
</style>