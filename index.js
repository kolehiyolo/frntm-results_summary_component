let values = {
    score: 0,
    reaction: 0,
    memory: 0,
    verbal: 0,
    visual: 0,
    verdict: {
        short: "",
        long: "",
    },
    color: {
        top: "hsl(252, 100%, 67%)",
        bottom: "hsl(241, 81%, 54%))"
    }
}

function startCalculating() {
    console.log(`startCalculating()`);

    // * First, we produce random values for the scores
    randomizeValues();

    // * Then, we do a loop updating from the HTML from the top bar to the bottom
    updateScoreBars();
}

function randomizeValues() {
    console.log(`randomizeValues()`);

    // * Assign random values between 0 and 100 for the user's pretend scores
    values.reaction = Math.floor(Math.random() * 101);
    values.memory = Math.floor(Math.random() * 101);
    values.verbal = Math.floor(Math.random() * 101);
    values.visual = Math.floor(Math.random() * 101);

    let average = 100;

    values.reaction = average;
    values.memory = average;
    values.verbal = average;
    values.visual = average;

    // * The final score will then be the average of the preceding 4 values
    values.score = Math.floor((values.reaction + values.memory + values.verbal + values.visual) / 4);
}

function updateScoreBars() {
    console.log(`updateScoreBars()`);

    // * Here we assign the order of how we'll present the scores
    let categories = ["reaction", "memory", "verbal", "visual"];

    // * Next, we'll do the loop chain of timers to do the count up for each category
    let counterSpeed = 15;
    let delaySpeed = 200;
    let currentCategoryIndex = -1;
    let currentCategory = categories[currentCategoryIndex];
    let currentCategoryDone = true;
    let currentCategoryScore = 0;
    const parentCounter = setInterval(() => {
        if (currentCategoryDone === true) {
            currentCategoryIndex++;
            currentCategory = categories[currentCategoryIndex];
            currentCategoryDone = false;
            currentCategoryScore = 0;
            setTimeout(() => {
                const counter = setInterval(function () {
                    currentCategoryScore++;
                    $(`.summary .${currentCategory} .score .result`).html(currentCategoryScore);
                    $(`.${currentCategory} .fluid`).attr('style', `width: ${currentCategoryScore}%`);
                    if (currentCategoryScore === values[currentCategory]) {
                        currentCategoryDone = true;
                        clearInterval(counter);
                    }
                }, counterSpeed);
            }, delaySpeed);
        }
        if (currentCategoryIndex === categories.length) {
            // * Once that's done, we then update the gradiented card's content
            setTimeout(() => {
                updateVerdictCard();
            }, delaySpeed);
            clearInterval(parentCounter);
        }
    }, counterSpeed);
}

function updateVerdictCard() {
    console.log(`updateVerdictCard()`);

    function countUpScore() {
        let currentScore = 0;
        const counter = setInterval(function () {
            currentScore++;
            $(`.upper .score_bubble .score`).html(currentScore);
            updateCardUpperColors(currentScore);
            if (currentScore === values.score) {
                clearInterval(counter);
                $(`.upper .score_bubble .ripple`).removeClass(`ripple-default`);
                $(`.upper .score_bubble .ripple`).addClass(`ripple-expanded`);
                setInterval(function () {
                    $(`.upper .score_bubble .ripple`).removeClass(`ripple-expanded`);
                    $(`.upper .score_bubble .ripple`).addClass(`ripple-default`);
                }, 1000);
            }
        }, 25);
    }

    function updateCardUpperColors(currentScore) {
        console.log(`updateCardUpperColors()`);

        // RED = 0
        // BLUE = 220
        let topHue = currentScore * 2.3;
        let topBottom = topHue - 20;

        values.color.top = `hsl(${topHue}, 100%, 67%)`;
        values.color.bottom = `hsl(${topBottom}, 81%, 54%))`;

        $(`.card .upper`).attr('style', `background-image: linear-gradient(${values.color.top}, ${values.color.bottom}`);
    }

    countUpScore();
}