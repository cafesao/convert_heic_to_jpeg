import './App.css'
import { useState, useEffect, useRef } from 'react'
import { getImages } from './helper/convert'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import waitZip from './helper/download'

function App() {
  const [heicImages, setHeicImages] = useState<FileList | null>(null)
  const [convertImages, setConvertImages] = useState<Blob[]>()
  const refInput = useRef<HTMLInputElement>(null)

  async function handleConvertImages() {
    if (heicImages !== null) {
      await toast.promise(getImages(heicImages), {
        pending: 'Converting...',
        success: {
          render({ data }) {
            setConvertImages(data)
            return `Success`
          },
          autoClose: 1500,
        },
        error: {
          render({ data }: any) {
            return data.message
          },
          autoClose: 1500,
        },
      })
    } else {
      toast.info('Select one or more images', {
        autoClose: 1500,
      })
    }
  }

  useEffect(() => {
    async function downloadZip() {
      await waitZip(convertImages)
    }
    downloadZip()
  }, [convertImages])

  return (
    <div className="App">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="file"
          accept="image/heic"
          multiple={true}
          onChange={(event) => setHeicImages(event.target.files)}
          ref={refInput}
        />
        <button onClick={handleConvertImages}>Convert</button>
        <button
          className="button_clear"
          onClick={() => {
            setHeicImages(null)
            if (refInput.current !== null) {
              refInput.current.value = ''
            }
          }}
        >
          Clear
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default App
