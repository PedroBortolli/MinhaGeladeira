import React from 'react'
import { Text } from 'react-native'
import { Link } from 'react-router-native'
import styled from 'styled-components'

const Test = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const Home = () => {
    return (
        <Test>
            <Text>Testando! =)</Text>
            <Link to='/about'>
                <Text>Sobre</Text>
            </Link>
        </Test>
    )
}

export default Home