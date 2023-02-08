import heic2any from 'heic2any'

async function convertImage(image: any) {
  try {
    const outputImage = await heic2any({
      blob: image,
      quality: 0.9,
      toType: 'image/jpeg',
    })
    return outputImage
  } catch (error) {
    throw error
  }
}

export async function getImages(images: FileList) {
  try {
    let imagesConvert: any[] = []
    for (let index = 0; index < images.length; index++) {
      const image = await convertImage(images.item(index))
      imagesConvert.push(image)
    }
    return imagesConvert
  } catch (error) {
    console.error(error)
  }
}
