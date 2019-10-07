import React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { NativeRouter, Route, nativeHistory } from 'react-router-native'
import Home from './pages/Home'
import About from './pages/About'
import Ingredients from './pages/Ingredients'
import NavBar from './components/NavBar'
import styled from 'styled-components'

const Container = styled.View`
    height: 100%;
    padding-top: ${StatusBar.currentHeight + 16};
`

const App = () => (
    <Container>
        <NativeRouter history={nativeHistory}>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/ingredients" component={Ingredients} />
            <NavBar />
        </NativeRouter>
    </Container>
)

export default App