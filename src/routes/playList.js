const express = require('express')
const router = express.Router()
const PlaylistController = require('../app/controllers/Playlist.controller')

router.get('/playlist', PlaylistController.randomPlaylist)
