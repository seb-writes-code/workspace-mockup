import { Sidebar } from './components/Sidebar'
import { ContextView } from './components/ContextView'

function App() {
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <Sidebar activeContextId="unified-search" />
      <ContextView />
    </div>
  )
}

export default App
