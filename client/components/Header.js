import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { primaryColor } from '../colors'
import burgerMenu from '../assets/burger-menu.png'

const Header = () => {
    return (
        <Container>
            <BurgerMenu tintColor="white" source={burgerMenu} />
            <Title>MinhaGeladeira</Title>
        </Container>
    )
}

export default Header

const Container = styled.View`
    width: 100%;
    height: 48px;
    background-color: ${primaryColor};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`
const Title = styled.Text`
    font-size: 26px;
    color: white;
    padding-right: 16px;
`
const BurgerMenu = styled.Image`
    width: 36px;
    height: 36px;
    margin-left: 8px;
`