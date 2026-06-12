# Security Specification for gen-lang-client-0315847808

## 1. Data Invariants
- A **Ticket** must have a `userId` that matches the authenticated user's UID.
- A **User** profile can only be created or modified by the user themselves.
- **Announcements** can only be written by admins (via a trusted source check).
- **Status** of a ticket can only be transitioned by the owner (to closed) or an admin.
- `createdAt` is immutable.
- `updatedAt` must be set to `request.time`.

## 2. The "Dirty Dozen" Payloads (Unauthorized Attempts)
1. **Identity Spoofing**: Creating a ticket with a `userId` belonging to someone else.
2. **Resource Poisoning**: Injecting a 1MB string as a ticket subject.
3. **Privilege Escalation**: Attempting to set `role: 'admin'` on own user profile.
4. **State Shortcutting**: Transitioning a ticket from `open` to `closed` without being the owner or admin.
5. **Orphaned Writes**: Creating a ticket with a random string as ID instead of a valid alphanumeric ID.
6. **PII Leak**: Reading another user's profile which contains their private email.
7. **Bypassing Immutability**: Attempting to change `createdAt` on an existing ticket.
8. **Malicious ID**: Creating a collection with a 1.5kB long ID.
9. **Shadow Field injection**: Adding `isVerified: true` to a ticket document.
10. **Query Scoping Failure**: Fetching all tickets in the system instead of just own tickets.
11. **Future Timestamp**: Setting `updatedAt` to a future date instead of `request.time`.
12. **Anonymous Access**: Writing data without being logged in.

## 3. Test Runner (Conceptual)
All payloads above MUST return `PERMISSION_DENIED`.
