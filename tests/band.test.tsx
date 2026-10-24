import { expect, test } from 'claude-code/testing'

const BAND = {
  plugin: 'dashboard-links',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isWorking: false,
    maxRows: 10,
    bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 9 },
    view: {},
  },
} as const

const FILE = JSON.stringify({
  links: [
    { label: 'Custom view tab', href: 'https://claude.ai/code/project/chan_x' },
    { label: 'Publishing Board', href: 'https://claude.ai/artifact/y' },
    { label: 'Not https', href: 'javascript:alert(1)' },
  ],
})

test("the band shows this project's links", async ($, on) => {
  on('fs.read', () => ({ value: FILE }))

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect(await ui.find({ type: 'Link', text: /Custom view tab/ })).toBeTruthy()
    expect(await ui.find({ type: 'Link', text: /Publishing Board/ })).toBeTruthy()
    expect(await ui.find({ type: 'Link', text: /Not https/ })).toBeFalsy()
    await ui.unmount()
  }
})

test('a project with no links file shows no band', async ($, on) => {
  on('fs.read', () => {
    throw new Error('ENOENT')
  })
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>engine</Text>
  })

  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await ui.find({ type: 'Link' })).toBeFalsy()
  await ui.unmount()
})
