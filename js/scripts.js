document.addEventListener("DOMContentLoaded", function() {

    const nextButton = document.querySelector(".carousel__button-next");
    const prevButton = document.querySelector(".carousel__button-prev");
    const articlesContainer = document.querySelector(".section__articles");
    let currentOffset = 0;
    let currentIndex = 0;

    function updateArticleWidth() {
        const articleWidth = articlesContainer.children[0].offsetWidth;
        const style = getComputedStyle(articlesContainer);
        const gap = parseInt(style.gap || style.columnGap || style.rowGap, 10);
        return articleWidth + gap;
    }

    let totalOffset = updateArticleWidth();

    function debounce(func, wait = 50) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function checkButtonsVisibility() {
        if (currentIndex === 0) {
            prevButton.classList.add("button-hidden");
        } else {
            prevButton.classList.remove("button-hidden");
        }
        
        if (currentIndex === articlesContainer.children.length - 1) {
            nextButton.classList.add("button-hidden");
        } else {
            nextButton.classList.remove("button-hidden");
        }
    }    

    checkButtonsVisibility();

    nextButton.addEventListener("click", function() {
        if (currentOffset > -totalOffset * (articlesContainer.children.length - 1)) {
            currentOffset -= totalOffset;
            articlesContainer.style.transform = `translateX(${currentOffset}px)`;
            currentIndex++;
        }
        checkButtonsVisibility();
    });

    prevButton.addEventListener("click", function() {
        if (currentOffset < 0) {
            currentOffset += totalOffset;
            articlesContainer.style.transform = `translateX(${currentOffset}px)`;
            currentIndex--;
        }
        checkButtonsVisibility();
    });

    window.addEventListener("resize", debounce(() => {
        const oldTotalOffset = totalOffset;
        totalOffset = updateArticleWidth();
        currentOffset = -(currentIndex * totalOffset);
        articlesContainer.style.transform = `translateX(${currentOffset}px)`;
    }));

    window.addEventListener('resize', function() {
        if(window.innerWidth > 1100) {
            articlesContainer.style.transform = '';
            currentOffset = 0;
            currentIndex = 0;
            checkButtonsVisibility();
        }
    });    
});
