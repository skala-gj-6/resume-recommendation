import { springClient } from './http'

export function demoLogin() {
  return springClient.post('/auth/demo-login')
}
