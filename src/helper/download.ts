import JSZip from 'jszip'
import { saveAs } from 'save-as'
import { v4 as uuidv4 } from 'uuid'

export default async function waitZip(images: Blob[] | undefined) {
  if (images !== undefined) {
    try {
      const zip = new JSZip()
      for (const image of images) {
        zip.file(`${uuidv4()}.jpeg`, image)
      }
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'images.zip')
      })
    } catch (error) {
      console.error(error)
    }
  }
}
