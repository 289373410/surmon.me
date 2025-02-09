/**
 * @file BFF Server tunnel
 * @module server.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'
import express, { RequestHandler } from 'express'
import { INVALID_ERROR } from '@/constants/error'
import { TunnelModule, getTunnelApiPath } from '@/constants/tunnel'
import { bilibiliService } from './bilibili'
import { wallpaperService } from './wallpaper'
import { githubService } from './github'
import { musicService } from './music'

// cache
export const tunnelCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 60 // 1 hour cache
})

// router
const handleTunnelService = (tunnelService: () => Promise<any>): RequestHandler => {
  return (_, response) => {
    tunnelService()
      .then((data) => response.send(data))
      .catch((error) => {
        response.status(INVALID_ERROR)
        response.send(error?.message || String(error))
      })
  }
}

export const tunnelRouter = express.Router()
tunnelRouter.get(getTunnelApiPath(TunnelModule.BiliBili), handleTunnelService(bilibiliService))
tunnelRouter.get(getTunnelApiPath(TunnelModule.Wallpaper), handleTunnelService(wallpaperService))
tunnelRouter.get(getTunnelApiPath(TunnelModule.GitHub), handleTunnelService(githubService))
tunnelRouter.get(getTunnelApiPath(TunnelModule.Music), handleTunnelService(musicService))
