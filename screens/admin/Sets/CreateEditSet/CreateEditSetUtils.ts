export const formatTimeFromServer = (hours?: number, mins?: number) => {
  return `${hours?.toString().length === 1 ? '0' : ''}${hours}:${
    mins?.toString().length === 1 ? '0' : ''
  }${mins}`
}

export const getTimeFromFormat = (time?: string | null) => {
  return time ? time?.split(':').map((t) => +t) : [0, 0]
}

export const getTimeOptions = (): string[] => {
  const options: string[] = []
  ;[...Array(24).keys()].forEach((hours) => {
    options.push(`${hours.toString().length === 1 ? '0' : ''}${hours}:00`)
    options.push(`${hours.toString().length === 1 ? '0' : ''}${hours}:15`)
    options.push(`${hours.toString().length === 1 ? '0' : ''}${hours}:30`)
    options.push(`${hours.toString().length === 1 ? '0' : ''}${hours}:45`)
  })
  return options
}
