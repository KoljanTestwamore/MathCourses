<script>
import Button from "./Button.svelte";

    let promoItems = [{
        image: 'https://assets3.thrillist.com/v1/image/1299823/414x310/crop;webp=auto;jpeg_quality=60;progressive.jpg',
        name: "Олег",
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    },
    {
        image: 'https://st.depositphotos.com/1771835/2035/i/600/depositphotos_20355973-stock-photo-portrait-real-high-definition-grey.jpg',
        name: "Олег",
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXC2HxEPlRBjYllA84A52N3BeFlN4S0w6OUg&usqp=CAU',
        name: "Олег",
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    }]
</script>

<div class="main-content">
    <div class="section1">
        <div class="container">
            <div class="title">
                Математика для детей 5-7 лет
                <br>
                <span>
                    на английском языке
                </span>
            </div>
            <h class="content">
                Поможем вашему ребенку развить абстрактное мышление и выучить английский
            </h>
            <Button className="button">
                Попробовать неделю бесплатно
            </Button>
            <img src="https://cdn-icons-png.flaticon.com/512/3557/3557694.png" alt="">
        </div>
    </div>
    <div class="section2">
        <h class="title">
            Отзывы о нас
        </h>
        <div class="vitrine">
            {#each promoItems as item}
                <div class="item">
                    <img src={item.image} alt="item">
                    <span class="name">{item.name}</span>
                    <span>{item.text}</span>
                </div>
            {/each}
        </div>
    </div>
    <div class="section1">
        <div class="container">
            <div class="title">
                Записывайся!
            </div>
            <h class="content">
                плати деньги, сука!
            </h>
            <Button className="button">
                Ладно...
            </Button>
        </div>
    </div>
</div>

<style lang="sass">
    .main-content
        .section1
            display: flex
            flex-basis: 0
            flex-grow: 1
            margin-bottom: 100px

            .container
                display: flex
                flex-direction: column
                margin-left: 88px    
                margin-top: 144px

                .title
                    font-size: 48px

                    span
                        color: #FA77ED

                .content
                    width: 600px
                    font-size: 24px    
                    margin-bottom: 72px

                .button
                    width: 132px

                img 
                    position: absolute
                    z-index: -1
                    top: 348px
                    right: 100px
                    width: 200px

        .section2
            display: flex
            flex-direction: column
            padding: 0 88px 120px 88px
            background-color: #EBB2E5

            .title
                margin-top: 80px
                font-size: 32px
                margin-bottom: 40px
                text-align: center
                font-weight: bold

            .vitrine
                display: flex
                justify-content: space-between

            .item 
                width: 200px
                display: flex
                flex-direction: column
                align-items: center
            
                .name
                    font-weight: bold

                img 
                    object-fit: cover
                    height: 100px
                    width: 100px
                    border-radius: 50px
                    margin-bottom: 10px

                span
                    text-align: center

</style>