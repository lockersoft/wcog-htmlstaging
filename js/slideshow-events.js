document.addEventListener("DOMContentLoaded", function () {

    const slidesElements = document.querySelectorAll(".slides .slide-image-wrapper");

    const total = slidesElements.length;
    if (!total) {
        return;
    }

    //NEXT/PREV
    const prev = document.querySelector(".events-slideshow .prev");
    const next = document.querySelector(".events-slideshow .next");

    //ALL SLIDE DETAILS
    const dateElement    = document.querySelector(".events-details-banner h2");
    const titleElement   = document.querySelector(".events-banner-content h3");
    const descriptionElement    = document.querySelector(".events-banner-content p");
    const detailsUL = document.querySelector(".events-banner-content-details");
    const registerButton    = document.querySelector(".events-register-button");

    //CREATE ARRAY FOR PAGINATION DOTS
    const dots = Array.from(document.querySelectorAll(".events-pagination .ellipse, .events-pagination .ellipse-active"));

    //Slide data (order MUST match images, not otherwise linked to slides)
    const slidesData = [
        {
            date: "May 22, 2024",
            title: "Free Bike Class!",
            description: "If you never learned to ride a bike as a kid and want to discover the joy of cycling, this class is for you!",
            details: [
                "<b>Length:</b> 1–2 hours",
                "<b>Class size:</b> 1",
                "<b>Who is this for:</b> Teen and adult beginners",
                "<b>Class Requirements:</b> A bicycle, helmet, closed toe shoes, and a good attitude"
            ],
            link: "st-rideshare.html", //TESTING URL TO ANOTHER PAGE
            alt: "Climate action group ride"
        },

        {
            date: "Placeholder date",
            title: "Placeholder Title",
            description: "Placeholder Description",
            details: [
                "<b>Length:</b> ---",
                "<b>Class size:</b> ---",
                "<b>Who is this for:</b> ---",
                "<b>Class Requirements:</b> ---"
            ],
            link: "#URL goes here",
            alt: "alt text goes here"
        },

        {
            date: "Placeholder date",
            title: "Placeholder Title",
            description: "Placeholder Description",
            details: [
                "<b>Length:</b> ---",
                "<b>Class size:</b> ---",
                "<b>Who is this for:</b> ---",
                "<b>Class Requirements:</b> ---"
            ],
            link: "#URL goes here",
            alt: "alt text goes here"
        },

        {
            date: "Placeholder date",
            title: "Placeholder Title",
            description: "Placeholder Description",
            details: [
                "<b>Length:</b> ---",
                "<b>Class size:</b> ---",
                "<b>Who is this for:</b> ---",
                "<b>Class Requirements:</b> ---"
            ],
            link: "#URL goes here",
            alt: "alt text goes here"
        }
    ];

    let index = 0;

    function render(i) {
        index = (i + total) % total;

        //SHOW ACTIVE SLIDE
        slidesElements.forEach((el, n) => {
            el.classList.toggle("active", n === index);
        });

        //UPDATE DETAIL ELEMENTS
        const s = slidesData[index];
        if (s) {
            if (dateElement) {
                dateElement.textContent = s.date;
            }
            if (titleElement) {
                titleElement.textContent = s.title;
            }
            if (descriptionElement) {
                descriptionElement.textContent = s.description;
            }
            if (detailsUL) {
                detailsUL.innerHTML = "";
                s.details.forEach(html => {
                    const li = document.createElement("li");
                    li.innerHTML = html;
                    detailsUL.appendChild(li);
                });
            }
            if (registerButton && s.link) {
                registerButton.href = s.link;
            }

            //UPDATE ALT TEXT
            const currentImageElement = slidesElements[index].querySelector("img");
            if (currentImageElement) {
                if (slidesElements.alt) {
                    currentImageElement.alt = slidesElements.alt;
                }
            }
        }//END UPDATES

        // UPDATE ACTIVE CLASS ON PAGINATION
        if (dots.length === total) {
            dots.forEach((dot, n) => {
                dot.classList.toggle("ellipse-active", n === index);
                dot.classList.toggle("ellipse", n !== index);
            });
        }
    }

    //NAV BUTTON EVENTS
    prev.addEventListener("click", function(event) {
        event.preventDefault();
        render(index - 1);
    });
    next.addEventListener("click", function(event) {
        event.preventDefault();
        render(index + 1);
    });

    //SHOW FIRST SLIDE
    render(0);


});//END OUTER FUNCTION
