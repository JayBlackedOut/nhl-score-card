# NHL Score Card

A custom Lovelace card for Home Assistant that displays NHL scores using the [hass-nhlapi](https://github.com/JayBlackedOut/hass-nhlapi) custom integration.

## Installation (HACS)

1. Go to HACS → Frontend → Custom repositories.
2. Add this repo URL as type **Lovelace**.
3. Install **NHL Score Card**.
4. Add the following resource in your Lovelace configuration:

```yaml
resources:
  - url: /hacsfiles/nhl-score-card/nhl-score-card.js
    type: module
```

## Examples
Light/dark mode follows the mode set in Home Assistant's settings.

### Game is scheduled:

![Game is scheduled in light mode](scheduled_game_light.png "Light mode")

![Game is scheduled in dark mode](scheduled_game_dark.png "Dark mode")

### Game is live:

![Game is live in light mode](live_game_light.png "Light mode")

![Game is live in dark mode](live_game_dark.png "Dark mode")

### Game has ended:

![Game is final in light mode](final_game_light.png "Light mode")

![Game is final in dark mode](final_game_dark.png "Dark mode")