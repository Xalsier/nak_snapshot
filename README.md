nak_snapshot
Snapshot builds of Na'kioku

Goals
Introduce unlockable cards that can be earned by playing the No-dachi Pachinko game.
Implement a cooldown mechanism for the ball usage in the No-dachi Pachinko game. When the player runs out of balls, they need to explore the wiki or webnovel for 7 seconds per ball as a setup for the cooldown. The cooldown time multiplies if the player runs out of balls multiple times (e.g. 14s, 21s, etc.), encouraging players to avoid losing balls. This information is stored locally in the storage, rather than in session storage, so that players cannot reset the cooldown by refreshing the page. The cooldown timer resets every 24 hours to prevent permanent penalties.
Store cards in 'storage' and allow players to search and add cards by ID if they know the 6-digit code for each card. This provides a secondary method for acquiring cards, which requires prior knowledge or active involvement in the community. Players can reset their stored cards at any time.