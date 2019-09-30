import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const Bar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: gray;
    height: 48px;
    width: 100%;
    position: absolute;
    bottom: 0px;
`

const NavBar = () => {
    return (
        <Bar>
            <View>
                <Text>Ing</Text>
            </View>
            <View>
                <Text>Scan</Text>
            </View>
            <View>
                <Text>Foo</Text>
            </View>
        </Bar>
    )
}

export default NavBar