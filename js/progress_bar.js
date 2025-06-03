//styling for this is in the st-trip-diary.css line ~30
function updateProgress(currentValue, goalValue) {
    const percent = Math.min((currentValue / goalValue) * 100, 100);
    const bar = document.getElementById("progress-bar");
    bar.style.width = percent + "%";
}

//TEST
// var currentMiles = 4500;
// var goalMiles    = 10000;
// updateProgress(currentMiles, goalMiles);
