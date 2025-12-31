import { useState } from 'react'

import Dashboard from './Pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import AddQuestions from './components/AddQuestions'
import ViewPlayers from './components/ViewPlayers'
import Analytics from './components/Analytics'
import { ToastContainer, toast } from 'react-toastify';
import CategoryManagement from './components/categoryManagement'
import QuestionManagement from './components/QuestionManagement'
function App() {
const API = "http://localhost:4000"

  return (
    <>
    <ToastContainer position='top-right' />
    <Routes>
      <Route  path="/" element={<Dashboard />}>
        <Route index element={<AddQuestions  API={API}  />} />
        <Route path="add-category" element={<AddQuestions API={API} />} />
        <Route path="category-management" element={<CategoryManagement  API={API} />} />
        <Route path="view-players" element={<ViewPlayers  />} />
        <Route path="analytics" element={<Analytics  />} />
        <Route path="question-management" element={<QuestionManagement  API={API} />} />
      </Route>

      <Route path="*" element={<div className="text-white p-10">404</div>} />
    </Routes>
    </>
  )
}

export default App
