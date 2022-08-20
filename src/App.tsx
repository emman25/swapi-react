import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Detail from './pages/Detail'
import Index from './pages/Index'


const App = () => {
  return (
	<div>
		<Routes>
			<Route path="/" element={<Index />} />
			<Route path="/details" element={<Detail />} />
		</Routes>
	</div>
  )
}

export default App