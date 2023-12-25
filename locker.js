document.addEventListener("DOMContentLoaded", function () {

    var score = 0;
    var timeLeft = 30;
    var gameOver = false;

    // Display the initial time left
    document.querySelector('.time').textContent = timeLeft;

    // Function to update the timer every second
    function updateTimer() {
        timeLeft--;

        // Display the updated time left
        document.querySelector('.time').textContent = timeLeft;

        // Check if time is up
        if (timeLeft <= 0) {
            endGame();
        } else {
            // Continue updating the timer every second
            setTimeout(updateTimer, 1000);
        }
    }

    // Start the timer
    setTimeout(updateTimer, 1000);

    // Function to handle the end of the game
    function endGame() {
        gameOver = true;
        // Stop the rotation animation
        rotatingBorder.style.animationPlayState = 'paused';

        // Display the final score
        document.querySelector('.angle').textContent = 'Game Over! Final Score: ' + score;
    }

    // Function to restart the game after 2 seconds
    function restartGame() {
        if(!gameOver){
            // Resume the rotation animation
            rotatingBorder.style.animationPlayState = 'running';

            // Generate a new random angle range
            targetRange = getRandomAngles();

            // Display the new random angle range
            angleDisplay.textContent = 'Target Angle Range: ' + targetRange[0] + ' to ' + targetRange[1];

            // Reset the message
            angleDisplay.textContent = 'Try again! Target Angle Range: ' + targetRange[0] + ' to ' + targetRange[1];
        }
    }

    // Function to generate a random angle between 0 and 360 degrees
    function getRandomAngles() {
        // Generate the first random angle
        var angle1 = Math.round(Math.random() * 270); // Maximum 270 to ensure a gap of at least 90

        // Generate the second random angle with a minimum gap of 90
        var angle2 = (angle1 + 90 + Math.round(Math.random() * (360 - angle1 - 90))) % 360;

        // Return the random angle pair
        return [angle1, angle2];
    }

    // Function to check if the spike is within the specified angle range
    function checkWin(angle, targetRange) {
        return angle+30 >= targetRange[0] && angle-30 <= targetRange[1];
    }

    // Get the rotating border element
    var rotatingBorder = document.querySelector('.rotatingBorder');

    // Get the element to display the angle
    var angleDisplay = document.querySelector('.angle');

    // Variable to store the current rotation angle
    var currentAngle = 0;

    // Generate a random angle range at the beginning
    var targetRange = getRandomAngles();

    // Display the initial random angle range
    angleDisplay.textContent = 'Target Angle Range: ' + targetRange[0] + ' to ' + targetRange[1];

    // Function to handle click or touch event
    function handleClick() {
        // Stop the rotation animation
        rotatingBorder.style.animationPlayState = 'paused';

        // Get the computed style of the rotating border to get the current transform value
        var style = window.getComputedStyle(rotatingBorder);
        var transformValue = style.getPropertyValue('transform');

        // Extract the rotation angle from the transform value
        var matrix = new DOMMatrix(transformValue);
        currentAngle = Math.round((Math.atan2(matrix.b, matrix.a) * (180 / Math.PI) + 360) % 360);
        console.log("currentAngle: ",currentAngle);

        // Check if the spike is within the target angle range
        if (checkWin(currentAngle, targetRange)) {
            score++;
            // Display the score
            document.querySelector('.score').textContent = score;
            angleDisplay.textContent = 'You won!';
            setTimeout(restartGame, 2000);
        } else {
            // angleDisplay.textContent = 'Try again! Target Angle Range: ' + targetRange[0] + ' to ' + targetRange[1];
            setTimeout(restartGame, 2000);
        }
    }

    // Attach the click event listener
    rotatingBorder.addEventListener('click', handleClick);

    // For touch devices, handle touch events
    rotatingBorder.addEventListener('touchstart', function (event) {
        event.preventDefault(); // Prevents the default touch behavior (e.g., scrolling)
        handleClick();
    });
});
