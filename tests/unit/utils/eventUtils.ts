export const eventUtils = {
  mouseClickEvent(eventInitDict: MouseEventInit = {}) {
    return new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      ...eventInitDict,
    })
  },
}
