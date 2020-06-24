const magnify = (function(){
    const img = document.body.querySelector(".magnify");
    const glass = document.createElement("div");
    const glassDimension = 100; // dimension of magnifier glass in PX

    let isVisible = false; // flag to use on mousemove event

    // magnifier glass
    glass.classList.add("glass");
    glass.style.width = `${glassDimension}px`;
    glass.style.height = `${glassDimension}px`;
    glass.style.backgroundImage = `url(${img.src})`;
    document.body.append(glass);

    // show hide glass
    img.addEventListener("mouseover", function(){
        glass.style.display = "block";
        isVisible = true;
    });
    img.addEventListener("mouseout", function(){
        glass.style.display = "none";
        isVisible = false;
    });

    window.addEventListener("mousemove", function (evt) {
        if(isVisible) {
            const mouseX = evt.clientX;
            const mouseY = evt.clientY;

            const bgX = 100 * (mouseX - img.offsetLeft) / img.offsetWidth;
            const bgY = 100 * (mouseY - img.offsetTop) / img.clientHeight;

            glass.style.left = `${mouseX - glassDimension/2}px`;
            glass.style.top = `${mouseY - glassDimension/2}px`;

            glass.style.backgroundPosition = `${bgX}% ${bgY}%`;
        }
    })
})();