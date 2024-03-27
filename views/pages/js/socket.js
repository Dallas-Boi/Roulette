// Made Tuesday, March 26th, 2024

const socket = io();

// When the server emits the spin wheel function
socket.on("spinWheel", function(data) {
    console.log(data)
    spinWheel(data)
})

// When all clients are ready the server will start the game
socket.on("startGame", function() {
    $(".menu").hide()
    $("#gameDiv").show()
})