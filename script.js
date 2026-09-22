const exampleTickets = [
    {
        id: 101,
        customer: "Acme Corp",
        subject: "Payment failed for entire team",
        message: "Payment failed twice and our service is now unavailable for the entire team."
    },

    {
        id: 102,
        customer: "Bright Labs",
        subject: "Cannot log in",
        message: "I cannot log in to my account."
    },

    {
        id: 103,
        customer: "Maya",
        subject: "Change profile photo",
        message: "How can I change my profile photo?"
    }
];


let tickets = [];


function checkPriority(ticket) {

    const text = (
        ticket.subject + " " + ticket.message
    ).toLowerCase();

    let score = 0;
    let reasons = [];


    if (text.includes("payment failed")) {
        score = score + 5;
        reasons.push("Payment failure");
    }


    if (text.includes("service unavailable")) {
        score = score + 5;
        reasons.push("Service unavailable");
    }


    if (text.includes("entire team")) {
        score = score + 4;
        reasons.push("Multiple users affected");
    }


    if (text.includes("cannot log in")) {
        score = score + 3;
        reasons.push("Login problem");
    }


    if (text.includes("failed twice")) {
        score = score + 2;
        reasons.push("Repeated failure");
    }


    let priority = "Low";


    if (score >= 10) {
        priority = "Critical";
    } else if (score >= 6) {
        priority = "High";
    } else if (score >= 3) {
        priority = "Medium";
    }


    return {
        id: ticket.id,
        customer: ticket.customer,
        subject: ticket.subject,
        message: ticket.message,
        score: score,
        priority: priority,
        reasons: reasons
    };
}


const loadButton =
    document.getElementById("loadExampleBtn");

const ticketList =
    document.getElementById("ticketList");

const criticalCount =
    document.getElementById("criticalCount");

const highCount =
    document.getElementById("highCount");

const mediumCount =
    document.getElementById("mediumCount");

const lowCount =
    document.getElementById("lowCount");

const ticketCount =
    document.getElementById("ticketCount");

const priorityFilter =
    document.getElementById("priorityFilter");

const emptyState =
    document.getElementById("emptyState");


loadButton.addEventListener("click", function () {

    tickets = [];

    for (let i = 0; i < exampleTickets.length; i++) {

        const result =
            checkPriority(exampleTickets[i]);

        tickets.push(result);
    }

    updateSummary();

    showTickets();
});


priorityFilter.addEventListener("change", function () {

    showTickets();

});


function updateSummary() {

    let critical = 0;
    let high = 0;
    let medium = 0;
    let low = 0;


    for (let i = 0; i < tickets.length; i++) {

        if (tickets[i].priority === "Critical") {
            critical = critical + 1;
        }

        if (tickets[i].priority === "High") {
            high = high + 1;
        }

        if (tickets[i].priority === "Medium") {
            medium = medium + 1;
        }

        if (tickets[i].priority === "Low") {
            low = low + 1;
        }
    }


    criticalCount.textContent = critical;
    highCount.textContent = high;
    mediumCount.textContent = medium;
    lowCount.textContent = low;

    ticketCount.textContent =
        tickets.length + " ticket(s)";
}


function showTickets() {

    ticketList.innerHTML = "";


    const selectedPriority =
        priorityFilter.value;


    let visibleTickets = [];


    for (let i = 0; i < tickets.length; i++) {

        const ticket = tickets[i];


        if (
            selectedPriority === "all" ||
            ticket.priority.toLowerCase() === selectedPriority
        ) {

            visibleTickets.push(ticket);

        }
    }


    if (tickets.length === 0) {

        emptyState.style.display = "block";

        return;
    }


    emptyState.style.display = "none";


    if (visibleTickets.length === 0) {

        ticketList.innerHTML = `
            <div class="empty-state">
                <h3>No matching tickets</h3>
                <p>There are no tickets with this priority.</p>
            </div>
        `;

        return;
    }


    for (let i = 0; i < visibleTickets.length; i++) {

        const ticket = visibleTickets[i];

        const card =
            document.createElement("div");

        card.className = "ticket";


        const priorityClass =
            "priority-" + ticket.priority.toLowerCase();


        card.innerHTML = `
            <div class="ticket-header">

                <div>
                    <h3 class="ticket-title">
                        ${ticket.subject}
                    </h3>

                    <p class="ticket-customer">
                        ${ticket.customer}
                    </p>
                </div>

                <span class="priority ${priorityClass}">
                    ${ticket.priority}
                </span>

            </div>


            <p class="ticket-message">
                ${ticket.message}
            </p>


            <div class="ticket-footer">

                <span class="score">
                    Score: ${ticket.score}
                </span>

                <button class="why-button">
                    Why?
                </button>

            </div>


            <div class="explanation" style="display: none;">

                <p class="explanation-title">
                    Why this priority?
                </p>

                ${createReasons(ticket.reasons)}

            </div>
        `;


        const whyButton =
            card.querySelector(".why-button");

        const explanation =
            card.querySelector(".explanation");


        whyButton.addEventListener("click", function () {

            if (explanation.style.display === "none") {

                explanation.style.display = "block";
                whyButton.textContent = "Hide";

            } else {

                explanation.style.display = "none";
                whyButton.textContent = "Why?";

            }

        });


        ticketList.appendChild(card);
    }
}


function createReasons(reasons) {

    if (reasons.length === 0) {

        return `
            <p class="reason">
                No priority signals were found.
            </p>
        `;
    }


    let html = "";


    for (let i = 0; i < reasons.length; i++) {

        html = html + `
            <p class="reason">
                ${reasons[i]}
            </p>
        `;
    }


    return html;
}
