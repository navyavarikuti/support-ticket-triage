# Support Ticket Triage

A small web tool that helps a support team decide which customer tickets should be handled first.

## Problem

When a support team receives multiple tickets at the same time, it can be difficult to quickly identify which problems need attention first.

For example, a request to change a profile picture is different from an issue where an entire team cannot access the application.

I wanted to build a small tool that could make this first step easier.

## Goal

The goal of this project is to:

- assign a priority to each support ticket
- show the important signals found in the ticket
- explain why a ticket received its priority
- allow the user to filter tickets by priority

## Scope

This is intentionally a small first version.

### Included

- Example support tickets
- Simple priority scoring
- Critical, High, Medium and Low priorities
- Priority filtering
- Explanation of the score

### Not included

- User authentication
- Database
- Email notifications
- Full support ticket management
- AI/LLM integration
- Backend API

These features are outside the scope of the first version because the main goal is to test the prioritization idea.

## Technology

- HTML
- CSS
- JavaScript

No framework or external API is used.

## How to run

Open `index.html` in a browser.

## Current status

Early version. The project will be improved as I test the rules with different examples.
