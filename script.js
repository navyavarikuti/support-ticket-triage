const exampleTickets = [
  {
    id: 101,
    customer: "Acme Corp",
    subject: "Payment failed for entire team",
    message:
      "Payment failed twice and our service is now unavailable for the entire team."
  },
  {
    id: 102,
    customer: "Bright Labs",
    subject: "Cannot log in",
    message:
      "I cannot log in to my account after resetting my password."
  },
  {
    id: 103,
    customer: "Northstar",
    subject: "Our entire team cannot log in",
    message:
      "Nobody in our company can access the dashboard this morning."
  },
  {
    id: 104,
    customer: "Maya",
    subject: "How do I change my profile photo?",
    message:
      "I would like to update my profile picture but cannot find the option."
  },
  {
    id: 105,
    customer: "Studio 42",
    subject: "Please add dark mode",
    message:
      "It would be great if the application supported dark mode."
  },
  {
    id: 106,
    customer: "Orbit",
    subject: "Service unavailable",
    message:
      "The application is showing a service unavailable message."
  },
  {
    id: 107,
    customer: "Ravi",
    subject: "Payment methods question",
    message:
      "Which payment methods do you currently support?"
  }
];

let tickets = [];


/* Get elements from HTML */

const loadButton = document.getElementById("loadExampleBtn");
const ticketList = document.getElementById("ticketList");
const emptyState = document.getElementById("emptyState");

const criticalCount = document.getElementById("criticalCount");
const highCount = document.getElementById("highCount");
const mediumCount = document.getElementById("mediumCount");
const lowCount = document.getElementById("lowCount");

const ticketCount = document.getElementById("ticketCount");
const priorityFilter = document.getElementById("priorityFilter");


/* Load example tickets */

loadButton.addEventListener("click", function () {
  tickets = [];

  for (let i = 0; i < exampleTickets.length; i++) {
    const ticket = exampleTickets[i];

    const result = checkPriority(ticket);

    tickets.push(result);
  }

  showTickets();
});


/* Decide the priority of a ticket */

function checkPriority(ticket) {
  const text =
    (ticket.subject + " " + ticket.message).toLowerCase();

  let score = 0;
  let reasons = [];

  if (text.includes("payment failed")) {
    score += 5;
    reasons.push("Payment failure");
  }

  if (text.includes("service unavailable")) {
    score += 5;
    reasons.push("Service unavailable");
  }

  if (
    text.includes("entire team") ||
    text.includes("everyone") ||
    text.includes("all users") ||
    text.includes("nobody")
  ) {
    score += 4;
    reasons.push("Multiple users affected");
  }

  if (
    text.includes("cannot log in") ||
    text.includes("can't log in") ||
    text.includes("unable to log in")
  ) {
    score += 3;
    reasons.push("Login problem");
  }

  if (
    text.includes("failed twice") ||
    text.includes("failed again")
  ) {
    score += 2;
    reasons.push("Repeated failure");
  }

  let priority = "low";

  if (score >= 10) {
    priority = "critical";
  } else if (score >= 6) {
    priority = "high";
  } else if (score >= 3) {
    priority = "medium";
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


/* Display tickets on the page */

function showTickets() {
  ticketList.innerHTML = "";

  updateSummary();

  let selectedPriority = priorityFilter.value;

  let visibleTickets = [];

  for (let i = 0; i < tickets.length; i++) {
    if (
      selectedPriority === "all" ||
      tickets[i].priority === selectedPriority
    ) {
      visibleTickets.push(tickets[i]);
    }
  }

  ticketCount.innerText =
    visibleTickets.length + " tickets";

  if (visibleTickets.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  for (let i = 0; i < visibleTickets.length; i++) {
    createTicket(visibleTickets[i]);
  }
}


/* Create one ticket card */

function createTicket(ticket) {
  const card = document.createElement("div");

  card.className = "ticket";

  const main = document.createElement("div");
  main.className = "ticket-main";

  const header = document.createElement("div");
  header.className = "ticket-header";

  const titleArea = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "ticket-title";
  title.innerText = ticket.subject;

  const customer = document.createElement("p");
  customer.className = "ticket-customer";

  customer.innerText =
    ticket.customer + " · #" + ticket.id;

  titleArea.appendChild(title);
  titleArea.appendChild(customer);

  const priority = document.createElement("span");

  priority.className =
    "priority priority-" + ticket.priority;

  priority.innerText = ticket.priority;

  header.appendChild(titleArea);
  header.appendChild(priority);

  const description = document.createElement("p");

  description.className = "ticket-message";
  description.innerText = ticket.message;

  const footer = document.createElement("div");

  footer.className = "ticket-footer";

  const score = document.createElement("span");

  score.className = "score";
  score.innerText = "Score: " + ticket.score;

  const whyButton = document.createElement("button");

  whyButton.className = "why-button";
  whyButton.innerText = "Why?";

  whyButton.addEventListener("click", function () {
    showReason(ticket, card);
  });

  footer.appendChild(score);
  footer.appendChild(whyButton);

  main.appendChild(header);
  main.appendChild(description);
  main.appendChild(footer);

  card.appendChild(main);

  ticketList.appendChild(card);
}


/* Show why the ticket received its priority */

function showReason(ticket, card) {
  const oldExplanation =
    card.querySelector(".explanation");

  if (oldExplanation) {
    oldExplanation.remove();
    return;
  }

  const explanation =
    document.createElement("div");

  explanation.className = "explanation";

  const heading =
    document.createElement("p");

  heading.className = "explanation-title";
  heading.innerText = "Why this priority?";

  explanation.appendChild(heading);

  if (ticket.reasons.length === 0) {
    const reason = document.createElement("p");

    reason.innerText =
      "No important signals were found.";

    explanation.appendChild(reason);
  } else {
    for (let i = 0; i < ticket.reasons.length; i++) {
      const reason =
        document.createElement("p");

      reason.className = "reason";

      reason.innerText =
        ticket.reasons[i];

      explanation.appendChild(reason);
    }
  }

  card.appendChild(explanation);
}


/* Update the numbers at the top */

function updateSummary() {
  let critical = 0;
  let high = 0;
  let medium = 0;
  let low = 0;

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].priority === "critical") {
      critical++;
    }

    if (tickets[i].priority === "high") {
      high++;
    }

    if (tickets[i].priority === "medium") {
      medium++;
    }

    if (tickets[i].priority === "low") {
      low++;
    }
  }

  criticalCount.innerText = critical;
  highCount.innerText = high;
  mediumCount.innerText = medium;
  lowCount.innerText = low;
}


/* Filter tickets */

priorityFilter.addEventListener("change", function () {
  showTickets();
});