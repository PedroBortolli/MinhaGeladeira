import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'

const Test = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    height: 100%;
`

export default function App() {
    return (
        <Test>
            <Text>Hello, World!</Text>
        </Test>
    )
}
