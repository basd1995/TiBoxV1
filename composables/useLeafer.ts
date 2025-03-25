import type { App, Rect as RectClass } from 'leafer-editor'

export const useLeafer = () => {
  let leaferApp!: App
  let Rect!: typeof RectClass
  
  const init = async() => {
    const { App, Rect: RectClass } = await import('leafer-editor')
    leaferApp = new App({
      view: 'leafer-view',
      editor: {},
    })
    Rect = RectClass
  }

  const addRect = () => {
    const rect = new Rect({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      fill: '#32cd79',
      cornerRadius: [50, 80, 0, 80],
      draggable: true,
      editable: true,
    })
    leaferApp.tree.add(rect)
  }

  return {
    leaferApp,
    Rect,
    init,
    addRect,
  }
}
