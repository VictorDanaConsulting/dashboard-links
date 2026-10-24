# caregility-dashboards

A small Claude Code mod for Dana Consulting's Caregility work. It puts a row of dashboard links above the chat box (Custom view, Sales Hub, Tracker), opens a side panel with the same links when a session starts, and adds a `/dashboards` command to reopen the panel. The links still need the right sign-in to open.

## Install

At the prompt of a terminal session:

```
/plugin install caregility-dashboards --marketplace VictorDanaConsulting/dashboard-links
```

Answer `y` to add the marketplace, then pick a scope (user scope is first).

From a shell:

```
claude plugin install caregility-dashboards --marketplace VictorDanaConsulting/dashboard-links
```

In the desktop app: click + next to the prompt box, then Plugins, Add marketplace with `VictorDanaConsulting/dashboard-links`, then Add plugin.
