import React from 'react'
import MainLayout from '../layouts/MainLayout'
import BodyContainer from './BodyContainer'

const App = () => (
  <MainLayout>
    <BodyContainer ownerUsername="topscores" />
  </MainLayout>
)

export default App
