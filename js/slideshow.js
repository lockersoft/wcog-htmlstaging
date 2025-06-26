$(document).ready(function() {
    // Array of image sources for the cycling image.
    var slides = [
        {
            text: "Number of Smart Trips recorded since 2006:",
            stats: "5,582,836",
            iconImg: "img/noun-bicycle-100339@1x.png",
            altText: "Bicycle Icon"
        },
        {
            text: "Total miles of Smart Trips recorded since 2006",
            stats: "81,172,951",
            iconImg: "img/icon_GreenLeaf.png",
            altText: "Leaf Icon"
        },
        {
            text: "Numbers of gallons of gas saved since 2006:",
            stats: "3.38 million",
            iconImg: "img/icon_GasPump.png",
            altText: "Gas Pump Icon"
        },
        {
            text: "Number of 7th Graders taught to ride the bus:",
            stats: "10,056",
            iconImg: "img/icon_Students.png",
            altText: "Students Riding Bus Icon"
        },
        {
            text: "Number of local businesses that offer Smart Trippers discounts:",
            stats: "177",
            iconImg: "img/icon_CoffeeCup.png",
            altText: "Coffee Cup Icon"
        }
        ];

    var currentIndex = 0;
    //test
    var slideInterval;
    var slideDelay = 4000;
    var userPauseDuration = 10000;

    function updateSlide() {
        $(".stat-info-p").html(slides[currentIndex].text);
        $(".statistics-card .stats").html(slides[currentIndex].stats);
        const $icon = $(".stat-icon-image");
        $icon.attr("src", slides[currentIndex].iconImg).attr("alt", slides[currentIndex].altText);

        $(".pagination div").each(function(index) {
            if (index === currentIndex) {
                $(this).removeClass("ellipse").addClass("ellipse-active");
            } else {
                $(this).removeClass("ellipse-active").addClass("ellipse");
            }

            //NOTE:
            // This just applies this to a couple images in the slideshow since they were requested to be smaller.
            // Should probably just resize them OR add this to all images if
            // they change them (or order) in the future...
            const src = $icon.attr("src");
            if (src === slides[1].iconImg || src === slides[2].iconImg || src === slides[4].iconImg) {
                $(".stat-icon-image").addClass("smaller-icon");
            } else {
                $(".stat-icon-image").removeClass("smaller-icon");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }
    function previousSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    }
    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    function resetSlideTimer() {
        stopAutoSlide();
        setTimeout(startAutoSlide, userPauseDuration);
    }

    updateSlide();
    startAutoSlide();

    //GO - PREVIOUS SLIDE
    $(".path-207").on("click", function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        previousSlide();
        resetSlideTimer();
    });

    //GO - NEXT SLIDE
    $(".path-200").on("click", function() {
        currentIndex = (currentIndex + 1) % slides.length;
        nextSlide();
        resetSlideTimer();
    })



});
//END DOCUMENT.READY