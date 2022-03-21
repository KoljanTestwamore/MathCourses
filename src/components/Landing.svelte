<script>
import Button from "./Button.svelte";

    let promoItems = [{
        image: '../static/image2.png',
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


    let seriesItems = [{
        image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-online-web-store-flaticons-lineal-color-flat-icons-2.png',
        name: 'Формат обучения',
        text: 'Онлайн в группах по <b>5</b> человек'
    },{
        image: 'https://img.icons8.com/fluency/452/overtime.png',
        name: 'Расписание',
        text: '<b>2</b> раза в неделю по <b>30</b> минут'
    },{
        image: 'https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/452/external-game-game-development-icongeek26-outline-colour-icongeek26-1.png',
        name: 'Дополнительно',
        text: 'Интерактивные задания на платформе'
    }]

    let conditionsItems = [{
        name: '1',
        text: "<b>2</b> раза в неделю ребенок занимается с учителем в группе. Занятия проходят на платформе Zoom."
    },{
        name: '2',
        text: "Во время занятия учитель дает задания в онлайн-тренажере в виде игры."
    },{
        name: '3',
        text: "В конце недели учитель высылает родителям персональные рекомендации для ребенка и дополнительные материалы"
    }]

    let reviews = [{
        image: "https://images.pexels.com/photos/286625/pexels-photo-286625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        text: "Мы с женой на фрилансе, много путешествуем, поэтому часто Камилле приходится учиться даже в дороге. Развитием жертвовать не хочется, так что онлайн курасы - это просто спасение. Еще и язык учится заодно, что абсолютный бонус!"
    },{
        image: "https://images.pexels.com/photos/5082634/pexels-photo-5082634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        text: "Петру очень нравится играть на платформе, эти забавные рыбки заставляют его счиатать даже в выходные. Рад, что на российском рынке есть курсы математики на английском, потому что Петр билингв."
    },{
        image: "https://images.pexels.com/photos/7307937/pexels-photo-7307937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        text: "Мы с Лизой проводим это время вместе, мне нравится, что я вижу как она занимается, пока читаю рядом. Это весело, и я не боюсь, что она оплатит все курсы на сто лет, потому что есть детский режим."
    }]
</script>

<div class="main-content">
    <div class="section1">
        <div class="container">
            <div class="title">
                Математика <span class="highlight">на английском</span> 
                <br>для детей 5-7 лет 
            </div>
            <h class="content">
                Поможем вашему ребенку развить абстрактное мышление и выучить английский.
            </h>
            <h class="subcontent">
                Попробуйте 1 неделю <b>бесплатно</b>
            </h>
            <Button class="button">
                Попробовать
            </Button>
            <img src="https://cdn-icons-png.flaticon.com/512/3557/3557694.png" alt="">
        </div>
    </div>
    <div class="section2">
        <div class="content">
            <img class="main-image" src="https://www.kids-in-trips.ru/wp-content/uploads/2020/07/onlajn-lager-dlya-detej.jpg" alt="girl">
            <div class="description">
                <h class="title">
                    Что такое <span class="highlight">English Math</span>?
                </h>
                <p class="paragraph __first">
                    <b>Math English</b> - это онлайн-школа развития интеллекта для детей в возрасте от <b>5</b> до <b>7</b> лет.
                </p>
                <p class="paragraph __second">
                    Вместе с опытными преподавателями мы разработали программу, которая поможет вашему ребенку освоить арифметику и математику, развить логику в игровом формате. 
                </p>
                <p class="paragraph">
                    <b>Наша программа нацелена на развитие у ребенка</b>
                </p>
                <ul class="list">
                    <li>Cамостоятельности</li>
                    <li>Креативности</li>
                    <li>Концентрации и внимательности</li>
                    <li>Абстрактного мышления</li>
                </ul>
                <p class="paragraph">
                    Все это достигается засчет обучения на <span class="highlight">английском языке</span>.
                </p>
            </div>
        </div>
        <div class="series">
            {#each seriesItems as item}
                <div class="item">
                    <img src={item.image} alt="item">
                    <span class="name">{item.name}</span>
                    <span>{@html item.text}</span>
                </div>
            {/each}
        </div>
    </div>
    <div class="section3">
        <h class="title">
            Как устроена <span class="highlight">платформа</span>?
        </h>
        <div class="description">
            <ul class="list">
                <li>Небольшой размер группы помогает сделать процесс обучения персонализированным</li>
                <li>Удаленный формат - проходите задания на платформе из любого места в любое время</li>
                <li>Доступ к статистике ребенка и всем учебным материалам в кабинете родителя</li>
                <li>Быстрая связь с учителем</li>
            </ul>
            <img src="https://sun9-51.userapi.com/impf/80gOc79PgB_LpWNSbsOkOzV2wNWHUI_osYhQXA/r43sN_dtI8U.jpg?size=448x327&quality=95&sign=b380db9b83b47c311bd15431baad0424&type=album" alt="riba" >
        </div>

        <div class="series">
            {#each conditionsItems as item}
                <div class="item">
                    <div class="name">{item.name}</div>
                    <span class="text">{@html item.text}</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="section4">
        <h class="title">
            <span class="highlight">Почему математика на английском -</span><br>
            <span class="highlight">- это совсем не страшно </span>
        </h>
        <div class="content">
            <img src="https://sun9-52.userapi.com/impf/EnhwbyugPISPWdeT4EG_FpstBBigqR9w1MWc-g/j7GW1Y6VIJ0.jpg?size=590x340&quality=95&sign=37900aecf834bcb6851d0dd6c2218608&type=album" alt="">
            <div class="text">
                Даже если ребенок никогда не изучал английский, прохождение курса не будет слишком сложным. Уроки составлены так, что язык будет изучаться с самых основ.<br><br>
                Новые слова вводятся естественно, очень важную роль играет в уроке видео, где учитель показывает слова картинками или жестами, закрепляя ассоциации.<br><br>
                Уже через 2 недели ребенок сможет сказать простые фразы, показывать объекты и называть цифры. А через 3 месяца у 99% детей пропадает барьер перед иностранным языком, дети начинают строить диалоги на английском достаточно свободно на пройденные темы.<br><br>
                В школе и дома приходится считать и учить английский, что дает несомненное преимущество выпускникам English Math, ребята легко справляются с задачками и готовы не только ответить на уроке английского, но и сходить за покупками за границей. 
            </div>
        </div>
    </div>

    <div class="section5">
        <h class="title">
            <span class="highlight">Отзывы</span>
        </h>
        <div class="series">
            {#each reviews as item}
                <div class="item">
                    <img src={item.image} alt="">
                    <span class="text">{@html item.text}</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="section6">
        <h class="title">
            <span class="highlight">Наши преподаватели</span>
        </h>

        <div class="teachers">
            <div class="teacher">
                <img src="https://sun9-87.userapi.com/impf/acx8KSxLPRxu18PUmm32jJS24xiF1OQVx_xbxw/qP7xhrtIoas.jpg?size=264x264&quality=95&sign=a656554822efbe707c30d1c97b88dc4c&type=album" alt="">
                <div class="text">
                    <h class="name">
                        Алевтина Фетодова
                    </h>
                    <h>
                        Образование:<br>
                        2010-2016, Педагогический институт Герцена, С-Пб<br>
                        2018, повышение квалификации Стендфордский университет, направление “Внедрение иностранного языка в повседневную жизнь ребенка”
                        <br>
                        <br>
                        Находит подход как к маленьким детям с 3 лет в их первых шагах к познанию мира, так и с подростками 12 лет преодолевает барьеры мышления и языковой барьер.
                    </h>
                </div>
            </div>

                        <br>
                        <br>
                        <br>

            <div class="teacher">
                <img src="https://images.pexels.com/photos/8423388/pexels-photo-8423388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="">
                <div class="text">
                    <h class="name">
                        Катрин Игорева
                    </h>
                    <h>
                        Образование:<br>
                        2005-2011, Педагогический институт Нового Орлеана<br>
                        2014- 2020, лаборатория образовательных исследований ВШЭ в Москве<br>
                        2021 - почетный профессор ВШЭ<br>
                        <br><br>
                        Для Катрин дети - это особенные люди, они очень пластичны во всем, как физически, так и в мышлении. Исследования лаборатории, новые подходы и практики Катрин переносит в свои занятия. Катрин считает, что работать с детьми, смотреть как они развиваются - это истинное счастье. 
    
                    </h>
                </div>
            </div>
        </div>
    </div>

    <div class="section7">
        <h class="title">
            <span class="highlight">Запишитесь на пробное занятие</span><br>
            <span class="highlight2">или получите консультацию</span>
        </h>

        <div class="content">
            <div class="left-column">
                <h class="cost">
                    Стоимость курса
                </h>
                <span class="highlight">7000 руб/мес</span>
                <span class="subtitle">
                    Возврат денег
                </span>
                <span class="text">
                    У вас есть три занятия, чтобы попробовать. Если передумаете учиться, скажите — и мы вернём вам всю сумму.
                </span>
                <span class="subtitle">
                    Сэкономьте еще 13%
                </span>
                <span class="text">
                    Вы можете получить налоговый вычет. Спросите об этом менеджера при записи на курс или прочитайте в нашей статье.
                </span> <span class="subtitle">
                    Есть вопросы?
                </span>
                <span class="text">
                    Звоните нам 8 (800) 555-05-05 <br>
                    по будням с 10:00 до 19:00 МСК.<br>
                    Звонок бесплатный.
                </span>
            </div>
            <div class="right-column">
                <input placeholder="Имя">
                <input placeholder="Телефон">
                <input placeholder="Email">
                <Button>
                    Оставить заявку
                </Button>
            </div>
        </div>
        
    </div>
</div>

<style lang="sass">
    .main-content
        padding: 0 156px
        overflow-x: hidden

        & .highlight
            color: #76E0A5

        & input 
            border-radius: 8px
            padding: 12px 24px
            font-size: 16px
            width: 456px

        & .highlight2
            color: #C6F5DB

        & .series
            display: flex
            justify-content: space-around

        .item 
            width: 200px
            display: flex
            flex-direction: column
            align-items: center
        
            .name
                font-weight: bold

            img 
                object-fit: cover
                width: 64px
                margin-bottom: 8px

            span
                text-align: center

        & .section1
            display: flex
            flex-basis: 0
            flex-grow: 1
            margin-bottom: 288px
            position: relative

            .container
                display: flex
                flex-direction: column
                margin-top: 204px

                & .title
                    font-size: 42px
                    font-weight: 600
                    line-height: 68px
                    margin-bottom: 24px
                        
                & .content
                    width: 456px
                    font-size: 16px    
                    margin-bottom: 18px

                    &:last-child
                        background-color: red
                        margin-bottom: 44px

                & .subcontent
                    width: 456px
                    font-size: 16px    
                    margin-bottom: 44px

                :global(.button)
                    width: 132px
                    height: 48px
                    width: 180px

                & img 
                    position: absolute
                    z-index: -1
                    top: 224px
                    left: 700px
                    width: 512px

        & .section2
            display: flex
            flex-direction: column

            & .content 
                display: flex
                position: relative
                left: -348px
                width: 1496px

                & .main-image
                    height: 464px
                    border-radius: 40px

                & .description
                    margin-left: 240px
                    width: 552px
                    line-height: 28px

                    & .title
                        display: block
                        margin-bottom: 24px
                        font-size: 44px
                        line-height: 64px
                        font-weight: 600

                    & .paragraph
                        color: #333
                        opacity: 0.6
                        margin: 0

                        &.__first
                            margin-bottom: 12px

                        &.__second
                            margin-bottom: 36px
                        
                        &.__third
                            margin-bottom: 24px

                    & .list
                        color: #333
                        opacity: 0.6
                        margin: 0
                        padding-left: 21px
                        margin-bottom: 24px


            & .series
                margin-top: 88px
                margin-bottom: 152px
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
                    width: 64px
                    margin-bottom: 8px

                span
                    text-align: center


        & .section3
            margin-bottom: 104px

            & .title
                font-size: 44px

            & .description
                display: flex
                width: 1042px
                justify-content: space-between
                margin-bottom: 56px

                & .list
                    width: 456px
                    padding-left: 21px

                    & li 
                        margin-top: 14px
                        color: #333
                        opacity: 0.6

                & img
                    
                    width: 300px

            & .series
                & .name
                    width: 72px
                    height: 72px
                    border-radius: 36px
                    background-color: #76E0A5
                    text-align: center
                    line-height: 72px
                    font-size: 32px
                    color: #fff

                & .item
                    width: 266px
                   
                & .text
                    color: #333
                    opacity: 0.6

        & .section4
            margin-bottom: 104px

            & .title
                font-size: 44px

            & img 
                height: 340px
                width: 590px

            & .content 
                display: flex

            & .text 
                color: #333
                opacity: 0.6


        & .section5
            display: flex
            flex-direction: column
            align-content: center
            margin-bottom: 104px

            & .title
                font-size: 44px
                text-align: center  
                margin-bottom: 32px

            & .series
                & img 
                    width: 168px
                    height: 168px
                    border-radius: 12px

                & .text
                    color: #333
                    opacity: 0.6
       
       
        & .section6
            margin-bottom: 104px

            & .title
                font-size: 44px
                margin-bottom: 60px
                display: block

            & .teachers
                & .teacher
                    display: flex
                    flex-direction: row
                    & img
                        width: 264px
                        height: 264px
                        object-fit: cover
                        border-radius: 12px

                    & .name
                        font-size: 44px
                        color: #333
                        opacity: 0.6
                        margin-bottom: 20px
                        line-height: 28px

                    & .text
                        margin-left: 64px
                        display: flex
                        flex-direction: column
                        line-height: 24px
        
        & .section7
            margin-bottom: 100px

            & .title
                display: block
                font-size: 44px
                margin-bottom: 52px

            & .content
                display: flex

                & .left-column
                    width: 544px
                    display: flex
                    flex-direction: column

                    & .cost
                        color: #333
                        opacity: 0.6
                        font-size: 28px
                        margin-bottom: 12px

                    & > .highlight
                        font-size: 40px
                        margin-bottom: 18px

                    & .subtitle
                        margin-top: 32px
                        font-size: 28px
                        color: #C6C6C6

                    & .text
                        font-size: 16px
                        color: #C6C6C6

                & .right-column
                    width: 456px
                    margin-left: 136px

                    display: flex
                    flex-direction: column
                    margin-top: 76px

                    & :global(.button)
                        width: 100%
                        padding: 18px 36px

</style>