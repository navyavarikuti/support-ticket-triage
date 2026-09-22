# Decisions

## Why this problem?

I chose support ticket prioritization because it is a small problem with a clear user and a clear output.

A support person needs to decide which tickets should be looked at first.

## Why simple rules?

I decided to start with deterministic rules instead of an AI API.

The first version only needs to identify a few obvious signals such as:

- payment failure
- service unavailable
- multiple users affected
- login problems
- repeated failures

Using rules makes the result easy to understand and change.

## Why no backend?

The goal of this version is to test the prioritization idea.

A database or backend would add complexity without helping me answer the main question:

"Can simple signals help prioritize support tickets?"

## What I am not building

I am not building:

- authentication
- ticket assignment
- notifications
- a database
- a complete support platform
- AI classification

I want to keep the first version small enough to test properly.
