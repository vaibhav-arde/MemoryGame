// alert("Its working")
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour, userChosenColour;
let level = 0;
let gameStarted = false

flash = (idColor) => {
    $("#" + idColor).fadeToggle(100)
    setTimeout(() => {
        $("#" + idColor).fadeToggle(100)
    }, 1)
}
sound = (audioColor) => {
    // console.log(audioColor)
    switch (audioColor) {
        case "blue": let audioBlue = new Audio('sounds/blue.mp3');
            audioBlue.play();
            break;
        case "green": let audioGreen = new Audio('sounds/green.mp3');
            audioGreen.play();
            break;
        case "red": let audioRed = new Audio('sounds/red.mp3');
            audioRed.play();
            break;
        case "yellow": let audioYellow = new Audio('sounds/yellow.mp3');
            audioYellow.play();
            break;
        case "wrong": let audioWrong = new Audio('sounds/wrong.mp3');
            audioWrong.play();
            break;

        default: console.log(`Wrong color input for sound`)
            break;
    }
}
// flash = (idColor) => {
//     $("#" + idColor).animate({ opacity: 0.1 })
//     setTimeout(() => {
//         $("#" + idColor).animate({ opacity: 1 })
//     },10)
// }

animatePress = (classColor) => {
    $("." + classColor).addClass("pressed")
    setTimeout(() => { $("." + classColor).removeClass("pressed") }, 100)
}
nextSequence = () => {
    $("h1").text(`Level : ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    // console.log(randomChosenColour)
    flash(randomChosenColour)
    sound(randomChosenColour)
}

$(".btn").click((e) => {
    // console.log(e.target)
    // console.log(e.target.id)
    sound(e.target.id)
    animatePress(e.target.id)
    userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
    // level++
    // console.log(userClickedPattern)
    // setTimeout(() => nextSequence(), 1000)
    // nextSequence()
})

// $(document).one("keydown",() => nextSequence());
if (!gameStarted) {
    console.log("gameStarted", gameStarted)
    $(".startBtn").on("click", () => {
        gameStarted = !gameStarted
        $(".startBtn").hide();
        setTimeout(() => { nextSequence() }, 1000)
    });
    console.log("gameStarted", gameStarted)
}
// if (!gameStarted) {
//     console.log("gameStarted", gameStarted)
//     $(document).on("keydown", () => {
//         nextSequence()
//         gameStarted = !gameStarted
//         $(document).off("keydown");
//     });
//     console.log("gameStarted", gameStarted)
// }

checkAnswer = (currentLevel) => {
    console.log("gamePattern", gamePattern)
    console.log("userClickedPattern", userClickedPattern)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("That's correct!")
        console.log("userClickedPattern.length", userClickedPattern.length)
        console.log("gamePattern.length", gamePattern.length)
        if (gamePattern.length == userClickedPattern.length) {
            level++;
            console.log("Level up! : " + level)
            userClickedPattern = [];
            setTimeout(() => { nextSequence() }, 1000)

        }
    } else {
        console.log("That's wrong!")
        $(".container").addClass("game-over")
        setTimeout(() => $(".container").removeClass("game-over"), 1000)
        sound("wrong")
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        $("h1").text(`Ooops!! That was wrong click, Game Over.`)
        $(".startBtn").show();
        // alert("That was wrong click!! Starting new Game!!")
        gameStarted = !gameStarted
    }
    console.log("gamePattern after", gamePattern)
    console.log("userClickedPattern after", userClickedPattern)
}
// $('#' + gamePattern[gamePattern.length - 1])
// console.log("userChosenColour", userChosenColour);
// console.log("randomChosenColour", randomChosenColour);