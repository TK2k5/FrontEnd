/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useRef } from 'react'

import ReactQuill from 'react-quill'
import { uploadImage } from '@/apis/upload-image.api'
import { useAuth } from '@/contexts/auth-context'

interface IQuillEditorPros {
  value: string
  onChange: (value: string) => void
}

const QuillEditor = ({ value, onChange }: IQuillEditorPros) => {
  const { accessToken } = useAuth()

  const reactQuillRef = useRef<ReactQuill>(null)

  const handleUploadImage = useCallback(() => {
    // create input file
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      // check input file
      if (input !== null && input.files) {
        const file = input.files[0]
        const formData = new FormData()
        formData.append('images', file)
        // upload image to server
        const response = await uploadImage(formData, accessToken)
        const url = response.data.urls[0].url

        const quill = reactQuillRef.current
        if (quill) {
          // insert image to editor
          const range = quill.getEditorSelection()
          range && quill.getEditor().insertEmbed(range.index, 'image', url)
        }
      }
    }
  }, [])

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme='snow'
      value={value}
      onChange={onChange}
      modules={{
        toolbar: {
          // custom toolbar container
          container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['image']
          ],
          handlers: {
            // custom image handler
            image: handleUploadImage
          }
        },

        clipboard: {
          matchVisual: false
        }
      }}
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'image'
      ]}
    />
  )
}

export default QuillEditor
