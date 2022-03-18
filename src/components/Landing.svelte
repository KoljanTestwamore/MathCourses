<script>
    let promoItems = Array(3).fill({
        image: '/assets/image2.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    })
</script>

<div class="main-content">
    <div class="section1">
        <div class="left-column">
            <div class="text">
                Математические курсы на английском языке для вашего ребенка за семь тыщ рублей.
            </div>
        </div>
        <div class="image" />
    </div>
    <div class="section2">
        {#each promoItems as item}
            <div class="item">
                <img src={item.image} alt="item">
                <span>{item.text}</span>
            </div>
        {/each}
    </div>
</div>

<style lang="sass">
    .main-content
        .section1
            display: flex
            flex-basis: 0
            flex-grow: 1
            height: 450px

            .left-column
                flex: 50%
                display: flex
                align-items: center

                .text
                    padding: 20px

            .image
                flex: 50%
                background: url('/assets/image1.jpg')
                background-position: center

        .section2
            display: flex
            justify-content: space-between
            padding-top: 40px

            .item 
                width: 200px
                display: flex
                flex-direction: column
                align-items: center

                img 
                    height: 100px
                    width: 100px
                    border-radius: 50px
                    margin-bottom: 10px

                span
                    text-align: center

</style>