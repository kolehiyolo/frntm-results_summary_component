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

function randomize() {
    console.log(`randomize()`);

    values.reaction = Math.floor(Math.random() * 101);
    values.memory = Math.floor(Math.random() * 101);
    values.verbal = Math.floor(Math.random() * 101);
    values.visual = Math.floor(Math.random() * 101);

    values.score = Math.floor((values.reaction+values.memory+values.verbal+values.visual)/4);

    updateHTML();
    // updateCardUpperColors();
    countUpScore();
}

function updateHTML() {
    console.log(`updateHTML()`);
    $(`.summary .reaction .score .result`).html(values.reaction);
    $(`.summary .memory .score .result`).html(values.memory);
    $(`.summary .verbal .score .result`).html(values.verbal);
    $(`.summary .visual .score .result`).html(values.visual);
    
}

function countUpScore( ) {
    let currentScore = 0;
    const counter = setInterval(function () {
        currentScore++;
        $(`.upper .score_bubble .score`).html(currentScore);
        updateCardUpperColors(currentScore);
        if (currentScore===values.score) {
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
    // BLUE = 200
    let topHue = currentScore * 2;
    let topBottom = topHue - 70;

    values.color.top = `hsl(${topHue}, 100%, 67%)`;
    values.color.bottom = `hsl(${topBottom}, 81%, 54%))`;

    $(`.card .upper`).attr('style',`background-image: linear-gradient(${values.color.top}, ${values.color.bottom}`);
}