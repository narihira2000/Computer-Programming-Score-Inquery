import Home from 'Home'
import React, { useEffect } from 'react'

function App() {
  document.title = '成績查詢 | 計算機程式設計實習'
  const setViewHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  useEffect(() => {
    setViewHeight()
    window.addEventListener('resize', () => {
      setViewHeight()
    })
  }, [])
  return (
    <div className="min-h-screen">
      <Home />
    </div>
  )
}

export default App
