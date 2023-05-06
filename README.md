# README.md

## Na'kioku Snapshot Roadmap

Current version: Snapshot 3.5

Next major version: Snapshot 4.0

This roadmap outlines the developmental milestones from Snapshot 3.5 to Snapshot 4.0, which aims to introduce unlockable cards, a cooldown mechanism for the No-dachi Pachinko game, and a card storage system.

### Snapshot 3.6 // Engagement CD System
- Implement a cooldown mechanism for the No-dachi Pachinko game that rewards users for spending time on other pages (e.g., codex or webnovel) to earn balls when they run out.
- Develop a system that increases the cooldown multiplier when users run out of balls (e.g., 7s, 14s, etc.).
- Reward users for reading quick trivia in the codex, enabling them to reduce the cooldown by spending time there.
- Implement a system that resets the cooldown timer every 24 hours to prevent permanent penalties.

### Snapshot 3.7 // Anti-Cheating CD System
- Ensure that players cannot reset the cooldown by refreshing the page.
- Store the cooldown timer information locally in storage, rather than in session storage, to prevent users from bypassing the cooldown by clearing their session.

### Snapshot 3.8 // Reward System
- Implement a meter system in the No-dachi Pachinko game that players need to raise to different levels before purchasing loot crates of varying rarities.
- Develop the core gameplay mechanics for raising the meter, such as hitting pegs and landing balls in holes.
- Implement a special "rainbow" hole that raises the meter by one tier when a ball falls into it.

### Snapshot 3.9 // Lootbox System
- Implement the lootbox system that pulls data from a JSON or YAML file and selects different lootboxes based on rarity and user-selected filters (e.g., M/F, Solo, F/F, etc.).
- Create template cards for testing purposes, ensuring each card has a unique ID code.
- Test and refine the lootbox system to ensure proper functionality and integration with the No-dachi Pachinko game.

### Snapshot 4.0 // Storage System
- Implement a storage system for managing loot, including features for searching, resetting, and saving cards in local storage.
- Develop a user-friendly interface for managing the storage system, enabling players to easily interact with and organize their cards.
- Test and polish the storage system to ensure a smooth user experience and seamless integration with the rest of the website.

## Copyright

Copyright © 2023 Xalsier Kitsune. All Rights Reserved.
