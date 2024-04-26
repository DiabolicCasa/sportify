import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import ArticleList from './ArticleList'

const ArticlePage : React.FC = () => {

  const [isViewModalOpen , setIsViewModalOpen] = useState(false)

  const toggleViewModal = () =>{
    console.log("toggle view modal called")
    setIsViewModalOpen(!isViewModalOpen)
  }
  return (
   <>
    <Navbar/>
    <ArticleList  isViewModalOpen={isViewModalOpen} toggleViewModal={toggleViewModal}/>
   </>
  )
}

export default ArticlePage
