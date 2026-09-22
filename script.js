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

function checkPriority(ticket) {

    const text = (
        ticket.subject + " " + ticket.message
    ).toLowerCase();

    let score = 0;

    if (text.includes("payment failed")) {
        score = score + 5;
    }

    if (text.includes("service unavailable")) {
        score = score + 5;
    }

    if (text.includes("entire team")) {
        score = score + 4;
    }

    if (text.includes("cannot log in")) {
        score = score + 3;
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
        priority: priority
    };
}
