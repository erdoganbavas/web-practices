const clock = (function(){
    const second = document.querySelector(".frame .second");
    const minute = document.querySelector(".frame .minute");
    const hour = document.querySelector(".frame .hour");

    const now = new Date();
    let secondDeg = now.getSeconds() * 6; // every second is 6 degree
    let minuteDeg = now.getMinutes() * 6; // every minute is 6 degree
    let hourDeg = (now.getHours() * 30) + (minuteDeg / 60); // every hour is 30 degree + minute fraction

    // rotate arms to initial degrees
    rotate(second, secondDeg);
    rotate(minute, minuteDeg);
    rotate(hour, hourDeg);

    tick(); // first tick
    setInterval(tick, 1000);

    function tick() {
        rotate(second, secondDeg);
        // increase second degree with mod 360
        secondDeg = (secondDeg + 6) % 360;

        if(secondDeg === 0) {
            rotate(minute, minuteDeg);
            rotate(hour, hourDeg);

            minuteDeg = (minuteDeg + 6) % 360;
            hourDeg = (hourDeg + (6/60)) % 360;
        }
    }

    function rotate(el, deg) {
        el.style.transform = `rotateZ(${deg}deg)`;
    }
})();