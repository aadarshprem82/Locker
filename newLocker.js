document.addEventListener("DOMContentLoaded", function () {
    // Function to generate a random angle between 0 and 360 degrees
    function getRandomAngle() {
        return Math.round(Math.random() * 360);
    }

    // Function to check if the spike is within the specified angle range
    function checkWin(angle, targetRange) {
        return angle >= targetRange[0] && angle <= targetRange[1];
    }

    // Function to calculate the next angle in the sequence
    function getNextAngle(currentAngle) {
        return Math.ceil(currentAngle / 15) * 15;
    }

    // Get the rotating border element
    var rotatingBorder = document.querySelector('.rotatingBorder');

    // Get the element to display the angle
    var angleDisplay = document.querySelector('.angle');

    // Variable to store the current rotation angle
    var currentAngle = 0;

    // Generate a random angle range at the beginning
    var targetRange = [getRandomAngle(), getRandomAngle()];

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

        // Calculate the next angle in the sequence
        var nextAngle = getNextAngle(currentAngle);

        // Check if the spike is within the target angle range
        if (checkWin(currentAngle, targetRange)) {
            angleDisplay.textContent = 'You won!';
        } else {
            angleDisplay.textContent = 'Try again! Next Target Angle Range: ' + nextAngle + ' to ' + (nextAngle + 15);
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
