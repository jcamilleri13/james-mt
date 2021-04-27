import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
  return {
    headers: { Location: '/portfolio' },
    status: 302
  }
}
