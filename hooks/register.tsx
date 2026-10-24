import type { Register } from 'claude-code'

const PANE = 'caregility-dashboards'
const TITLE = 'Caregility dashboards'

const LINKS = [
  {
    label: 'Project home (Custom view tab)',
    short: 'Custom view',
    href: 'https://claude.ai/code/project/chan_01ENsV58mpoAMFJaFMBxG9gD',
    note: 'Open the view dropdown and pick Custom view',
  },
  {
    label: 'Sales Hub',
    short: 'Sales Hub',
    href: 'https://claude.ai/artifact/Lw8PQ5cJTgm423rNE7quNe',
    note: 'The team-facing hub',
  },
  {
    label: 'Project Tracker (v0.8)',
    short: 'Tracker',
    href: 'https://docs.google.com/spreadsheets/d/1zX5Eiw6TOjlKkQ_jlVHADkRc8P4RBY4JmgCkfjJp6fw/edit',
    note: 'Source of truth, updated nightly',
  },
]

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'dashboards',
      description: 'Show the Caregility dashboards panel',
    })
    void $.ui.open({ id: PANE, title: TITLE })

    return next(e)
  })

  on('command.run', { command: 'dashboards' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE })

    return { text: 'Caregility dashboards panel opened.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const { Box, Text, Link } = $.ui.resolve(e)

    return (
      <Box gap={2}>
        <Text dimColor>Dashboards:</Text>
        {LINKS.map(one => (
          <Link href={one.href} label={one.short} />
        ))}
      </Box>
    )
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Link } = $.ui.resolve(e)

    return (
      <Box flexDirection="column" gap={1}>
        {LINKS.map(one => (
          <Box flexDirection="column">
            <Link href={one.href} label={one.label} />
            <Text dimColor>{one.note}</Text>
          </Box>
        ))}
      </Box>
    )
  })
}
