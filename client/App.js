import React from 'react'
import { AppRegistry } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import Home from './pages/Home'
import About from './pages/About'

const App = () => (
    <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
    </NativeRouter>
)

export default App

//AppRegistry.registerComponent("Minha Geladeira", () => App)