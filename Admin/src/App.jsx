import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './Pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import AddQuestions from './components/AddQuestions'
import QuestionManagement from './components/QuestionManagement'
import ViewPlayers from './components/ViewPlayers'
import Analytics from './components/Analytics'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Routes>
      <Route  path="/" element={<Dashboard />}>
        <Route index element={<AddQuestions />} />
        <Route path="add-questions" element={<AddQuestions />} />
        <Route path="question-management" element={<QuestionManagement />} />
        <Route path="view-players" element={<ViewPlayers />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route path="*" element={<div className="text-white p-10">404</div>} />
    </Routes>
    </>
  )
}

export default App
