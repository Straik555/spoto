export type HardwareInfo = {
  id: number
  hardwareSerial: string
  status?: HardwareStatus
}

export enum HardwareStatus {
  Ordered = 'Ordered',
  Paid = 'Paid',
  Manufactured = 'Manufactured',
  Delivered = 'Delivered',
  Installed = 'Installed',
  Maintenance = 'Installed',
}

export type SpotHardwareStatus = {
  countOfRequiredSpollards: number
}

export enum HardwareItemStatus {
  Closed = 'Closed',
  Open = 'Open',
}

export type HardwareItem = {
  id: number
  hardwareId: string
  status: HardwareItemStatus
  licensePlate: string
  userName: string
  occupied: true
  moisture: number
  power: number
  temperature: number
  description: string
  uplinkUrl: string
  uplinkBearer: string
  downlinkUrl: string
  downlinkBearer: string
  lastCommand: string
  lastCommandTime: string
  alias: string
}

export type UnlinkBody = {
  id: number
}

export type LinkBody = UnlinkBody & {
  spotId: number
}
