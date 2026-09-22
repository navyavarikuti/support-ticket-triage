# Testing

I tested the project manually using the example support tickets.

## Priority tests

| Ticket | Expected Priority | Result |
|---|---|---|
| Payment failed for entire team | Critical | Passed |
| Cannot log in | Medium | Passed |
| Change profile photo | Low | Passed |
| Service unavailable | High | Passed |

## UI tests

- [x] Example tickets load when the button is clicked
- [x] Ticket priority is displayed
- [x] Priority score is displayed
- [x] Reasons for the priority are displayed
- [ ] Priority filtering
- [ ] Summary counts

## Edge cases I considered

- A ticket with no matching signals should receive Low priority.
- A ticket can match more than one rule.
- Multiple matching signals should increase the score.
- The priority should be based on the ticket subject and message.

## Current limitations

The current rules use simple keyword matching.

This means a ticket can sometimes contain a keyword without actually describing that problem.

For example, a question about payment methods could contain the word "payment" without being a payment failure.

A future version could use more structured ticket information or better matching rules.

## What I learned

The main challenge was deciding which signals should affect priority.

I kept the first version small so I could test the basic idea before adding more features.
