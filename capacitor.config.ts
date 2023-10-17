import 'dotenv/config'
import { CapacitorConfig } from '@capacitor/cli'
import { config as globalConfig } from './config'

console.log('CAPACITOR CONFIG globalConfig', globalConfig)

const config: CapacitorConfig = {
  appId: 'co.spoto.guramispoto',
  appName: 'Spoto',
  webDir: 'out',
  bundledWebRuntime: false,
}

export default config
