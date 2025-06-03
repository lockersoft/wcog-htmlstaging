document.addEventListener("DOMContentLoaded", function () {
    let selectedDayElement = null;
    const calendarGrid = document.getElementById("calendar-grid");
    const monthYearDisplay = document.getElementById("month-year");
    const form = document.getElementById("day-form");
    const selectedDateTitle = document.getElementById("selected-date-title");
    const formElement = document.getElementById("info-form");

    let currentDate = new Date();

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    //RENDER CALENDAR
    function renderCalendar(date) {
        calendarGrid.innerHTML = "";

        const month = date.getMonth();
        const year  = date.getFullYear();

        // DETERMINE PREVIOUS/NEXT YEAR OR MONTH
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear  = month === 0 ? year - 1 : year;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear  = month === 11 ? year + 1 : year;

        //GET DAYS IN PREV MONTH AND CURRENT MONTH
        const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
        const daysInMonth     = getDaysInMonth(month, year);

        //GET NUMBER OF FIRST DAY
        const firstDay = new Date(year, month, 1).getDay();

        // UPDATE HEADER ("Month Year")
        monthYearDisplay.textContent =
            `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        //FILL ANY DAYS FROM PREVIOUS MONTH
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = daysInPrevMonth - i;
            const dayDiv = document.createElement("div");
            dayDiv.textContent = dayNum;
            dayDiv.classList.add("other-month");
            dayDiv.addEventListener("click", () =>
                selectDay(dayDiv, prevYear, prevMonth, dayNum)
            );
            calendarGrid.appendChild(dayDiv);
        }

        //FILL ALL DAYS FOR CURRENT MONTH
        for (let d = 1; d <= daysInMonth; d++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = d;
            dayDiv.addEventListener("click", () =>
                selectDay(dayDiv, year, month, d)
            );
            calendarGrid.appendChild(dayDiv);
        }

        const totalCellsSoFar = firstDay + daysInMonth;
        const rowsNeeded = Math.ceil(totalCellsSoFar / 7);
        const cellsRequired = rowsNeeded * 7;
        const trailingCount  = cellsRequired - totalCellsSoFar;

        //FILL REST OF DAYS FROM NEXT MONTH
        for (let d = 1; d <= trailingCount; d++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = d;
            dayDiv.classList.add("other-month");
            dayDiv.addEventListener("click", () =>
                selectDay(dayDiv, nextYear, nextMonth, d)
            );
            calendarGrid.appendChild(dayDiv);
        }
    }//END RENDER CALENDAR


    //SELECT DAY OF THE CALENDAR
    function selectDay(dayDiv, year, month, day) {
        const form = document.getElementById("day-form");
        const modalContent = document.querySelector(".modal-content");
        const calendar = document.getElementById("calendar-container");
        const rect = calendar.getBoundingClientRect();
        form.style.display = "block";
        modalContent.style.position = "absolute";
        modalContent.style.top = `${rect.top + rect.height / 2}px`;
        modalContent.style.left = `${rect.left + rect.width / 2}px`;
        modalContent.style.transform = "translate(-50%, -50%)";
        const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        document.getElementById("selected-date").value = isoDate;
        const formatted = new Date(year, month, day).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: '2-digit'
        });
        document.getElementById("selected-date-title").textContent = formatted;
        document.querySelectorAll("#calendar-grid div").forEach(el => el.classList.remove("selected"));
        dayDiv.classList.add("selected");
    }//END SELECT DAY FUNCTION

    //CLOSE FORM WITH X
    document.getElementById("close-button").addEventListener("click", () => {
        document.getElementById("day-form").style.display = "none";
    });
    //CLOSE FORM WITH CANCEL BUTTON
    document.getElementById("cancel-button").addEventListener("click", () => {
        document.getElementById("day-form").style.display = "none";

    });




    document.getElementById("prev-month").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    };

    document.getElementById("next-month").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    };

    document.getElementById("day-form").addEventListener("click", function (e) {
        if (e.target === this) {
            this.style.display = "none";
        }
    });

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = {
            date: document.getElementById("selected-date").value,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            priority: document.getElementById("priority").value
        };
        console.log("Form submitted:", formData);
    });

    renderCalendar(currentDate);
});
