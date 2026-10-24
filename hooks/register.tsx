import type { EngineInterface, Register } from 'claude-code'

// Each project lists its own links in this file, in the project's shared
// folder: { "links": [{ "label": "...", "href": "https://..." }] }
const LINKS_FILE = '/mnt/project-files/dashboard-links.json'

type DashboardLink = { label: string; href: string }

const isLink = (one: unknown): one is DashboardLink =>
  typeof one === 'object' &&
  one !== null &&
  typeof (one as DashboardLink).label === 'string' &&
  typeof (one as DashboardLink).href === 'string' &&
  (one as DashboardLink).href.startsWith('https://')

const parseLinks = (text: string): DashboardLink[] => {
  try {
    const parsed: unknown = JSON.parse(text)
    const list = (parsed as { links?: unknown })?.links

    return Array.isArray(list) ? list.filter(isLink).slice(0, 8) : []
  } catch {
    return []
  }
}

async function readLinks($: EngineInterface): Promise<DashboardLink[]> {
  try {
    return parseLinks(await $.fs.read(LINKS_FILE))
  } catch {
    return []
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'dashboards',
      description: "Show this project's dashboard links",
    })

    return next(e)
  })

  on('command.run', { command: 'dashboards' }, async $ => {
    const links = await readLinks($)

    if (links.length === 0) {
      return {
        text: `No dashboard links for this project yet. Ask Claude to add some to ${LINKS_FILE}.`,
      }
    }

    return { text: links.map(link => `${link.label}: ${link.href}`).join('\n') }
  })

  // Pick up edits to the links file after each turn.
  on('turn.complete', ($, e, next) => {
    $.ui.invalidate('ui.render')

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const links = await readLinks($)

    if (links.length === 0) {
      return next(e)
    }

    const { Box, Link, Text } = $.ui.resolve(e)

    return (
      <Box flexDirection="row" flexWrap="wrap" gap={2}>
        <Text bold>Dashboards:</Text>
        {links.map(link => (
          <Link key={link.href} href={link.href} label={link.label} />
        ))}
      </Box>
    )
  })
}
