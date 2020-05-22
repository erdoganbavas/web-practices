const beforeAfter = (function() {
    const wrapper = document.body.querySelector(".ba-wrap");
    const right = document.body.querySelector(".ba-wrap .right");
    const handle = document.body.querySelector(".ba-wrap .handle");

    // initials
    let imgWidht = 0;
    let imgHeight = 0;
    let mousePreviousX = -1;
    let handleTranslateX = 0;
    let isDragging = false;

    document.body.onload = () => {
        imgWidht = right.offsetWidth;
        imgHeight = right.height;

        // handle's height
        handle.style.height = imgHeight + "px";

        // handle to middle
        handleTranslateX = imgWidht / 2;
        handle.style.transform = `translateX(${handleTranslateX}px)`;

        // hide right image's half
        right.style.clip = `rect(0, ${imgWidht}px, ${imgHeight}px, ${handleTranslateX}px)`;
    }

    window.addEventListener("mousemove", onDragHandle);

    handle.addEventListener("mousedown", function() {
        isDragging = true;

        handleTranslateX = handleTranslateX < 5 ? 5 : handleTranslateX;
        handleTranslateX = handleTranslateX > wrapper.offsetWidth-5 ? wrapper.offsetWidth-5 : handleTranslateX;
    })

    handle.addEventListener("mouseup", function() {
        mousePreviousX = -1;
        isDragging = false;
    })

    function onDragHandle(e) {
        if(!isDragging) return false;

        e.preventDefault();

        const mouseX = e.clientX;
        mousePreviousX = mousePreviousX < 0 ? mouseX : mousePreviousX;
        
        handleTranslateX = handleTranslateX + mouseX - mousePreviousX;
        handle.style.transform = `translateX(${handleTranslateX}px)`;

        right.style.clip = `rect(0, ${imgWidht}px, ${imgHeight}px, ${handleTranslateX}px)`;

        if(handleTranslateX < 5 || handleTranslateX > wrapper.offsetWidth-5) {
            mousePreviousX = -1;
            isDragging = false;
        } else {
            mousePreviousX = mouseX;
        }
    }

})();