# dashboard-links

A Claude mod that pins each project's own dashboard links just above the chat field. In a Claude project conversation, it reads `dashboard-links.json` from the project's shared files folder (`/mnt/project-files/`) and shows those links. A project with no file shows nothing. Typing `/dashboards` prints the same links. The row shows in the Claude desktop app and in Claude Code in a terminal.

## Adding links to a project

Ask that project's Claude to add them, or create `/mnt/project-files/dashboard-links.json` like this:

```json
{
  "links": [
    { "label": "Project home", "href": "https://claude.ai/code/project/..." },
    { "label": "Tracker", "href": "https://claude.ai/artifact/..." }
  ]
}
```

Only `https://` links are shown, at most eight. Changes show after the next reply.

## Install

At the prompt of a terminal session:

```
/plugin install dashboard-links --marketplace VictorDanaConsulting/dashboard-links
```

Answer `y` to add the marketplace, then press Enter to pick the user scope.

From a shell:

```
claude plugin install dashboard-links --marketplace VictorDanaConsulting/dashboard-links
```

In the desktop app: click + next to the prompt box, then Plugins, Add marketplace with `VictorDanaConsulting/dashboard-links`, then Add plugin.
