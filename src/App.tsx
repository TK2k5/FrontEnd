import { LanguageProvider } from './contexts/language-context'
import { RootState } from './stores/store'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { useAppSelector } from './stores/hook'

function App() {
  const { language } = useAppSelector((state: RootState) => state.language)

  return (
    <LanguageProvider languageLocal={language}>
      <RouterProvider router={routes} />
    </LanguageProvider>
  )
}

export default App
