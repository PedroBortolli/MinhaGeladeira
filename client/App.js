import React, { useState, useEffect } from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { NativeRouter, Route, nativeHistory } from 'react-router-native'
import Home from './pages/Home'
import About from './pages/About'
import Ingredients from './pages/Ingredients'
import Scanner from './pages/Scanner'
import NavBar from './components/NavBar'
import styled from 'styled-components'

const Container = styled.View`
    height: 100%;
    padding-top: ${StatusBar.currentHeight};
`

const App = () => {
    const [navBar, showNavBar] = useState(true)
    return (
        <Container>
            <NativeRouter history={nativeHistory}>
                <Route exact path="/" component={Ingredients} />
                <Route path="/about" component={About} />
                <Route path="/ingredients" component={Ingredients} />
                <Route path="/scanner" component={() => <Scanner showNavBar={showNavBar} />} />
                <NavBar show={navBar} />
            </NativeRouter>
        </Container>
    )
}

export default App