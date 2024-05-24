import vine from '@vinejs/vine'

export const updateBannerValidator = vine.compile(
  vine.object({
    banner: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png','jpeg']
    })
  })
)