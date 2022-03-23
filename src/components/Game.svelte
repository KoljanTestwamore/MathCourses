<script lang="ts">
import Button from "./Button.svelte";
import type { IGameStep } from "../types";

    export let questions: IGameStep[];

    const wrongAnswersPicked = [false, false, false]

    const wrongAnswerCallback = (index: number) => {
        wrongAnswersPicked[index] = true;

        console.log("Wrong!");
    }

    const rightAnswerPicked = () => {
        wrongAnswersPicked.forEach((_, i) => wrongAnswersPicked[i] = false);
        currentStep++;
        console.log("bom")
        if (questions.length <= currentStep) {
            handleVictory();
        }
    }

    const handleVictory = () => {};

    let currentStep = 0;

    let rightAnswerPosition = Math.floor(Math.random() * 4);

    const rightAnswerData = {
        onclick: rightAnswerPicked
    }
</script>


<div class="game">
    {#if currentStep < questions.length}
        <h class="question">
            {questions[currentStep].question}
        </h>
        <div class="answers">
            {#each questions[currentStep].wrongAnswers as wrongAnswer, i}
                {#if i == rightAnswerPosition}
                    <svelte:component this={Button} {...rightAnswerData}>
                        {questions[currentStep].rightAnswer}
                    </svelte:component>
                {/if}
            
                <Button onclick={() => wrongAnswerCallback(i)} isActive={!wrongAnswersPicked[i]}>
                    {wrongAnswer}
                </Button>
            {/each}
                {#if rightAnswerPosition == 3}
                    <svelte:component this={Button} {...rightAnswerData}>
                        {questions[currentStep].rightAnswer}
                    </svelte:component>
                {/if}
        </div>
    {:else}
        <div class="victory">
            Congratulations! Well done!
        </div>
    {/if}
</div>

<style lang="sass">
    .game
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center

        & .question 
            display: inline-block
            font-size: 44px
            font-weight: bold
            text-align: center
            margin-bottom: 20px

        & .answers
            width: 100%
            display: flex
            flex-wrap: wrap
            justify-content: space-around

            & :global(.button)
                height: 88px
                width: 45%
                margin: 12px
                font-size: 36px

        & .victory
            text-align: center
            font-size: 56px        

</style>