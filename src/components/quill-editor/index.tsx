/* eslint-disable @typescript-eslint/no-unused-vars */

import ReactQuill from 'react-quill'

interface IQuillEditorPros {
  value: string
  onChange: (value: string) => void
}

const QuillEditor = ({ value, onChange }: IQuillEditorPros) => {
  return <ReactQuill theme='snow' value={value} onChange={onChange} />
}

export default QuillEditor
