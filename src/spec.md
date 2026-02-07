# Specification

## Summary
**Goal:** Add an additional upward “smile” celebration animation on the Valentine “Yes! Of course! 💕” click, and update the main fixed CTA label text.

**Planned changes:**
- Add a new upward-moving smile/emoji animation that triggers when the user clicks the “Yes! Of course! 💕” button, while keeping all existing celebration effects unchanged.
- Ensure the new animation overlay does not intercept clicks/taps (pointer-events disabled) and auto-clears after completion to avoid accumulating elements across repeated runs.
- Update the fixed main CTA button label from “Make your own 💗” to exactly “Make your own 🔗😁”, without changing its navigation behavior or the current conditional visibility on personalized links.

**User-visible outcome:** Clicking “Yes! Of course! 💕” now shows an extra upward smile/emoji animation alongside the existing celebrations, and the main page CTA reads “Make your own 🔗😁” while behaving the same as before.
