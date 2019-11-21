import React from 'react'
import { View, Text, Image } from 'react-native'
import { Link } from 'react-router-native'
import styled from 'styled-components'
import Camera from '../assets/camera.png'
import Journal from '../assets/journal.png'
import Meal from '../assets/meal.png'
import { primaryColor } from '../colors'

const NavBar = ({show}) => {
    return (
        <Bar>
            <Link to='/ingredients'>
                <Image tintColor="white" source={Meal} />
            </Link>
            <Link to='/scanner'>
                <Image tintColor="white" source={Camera} />
            </Link>
            <Link to='/suggestions'>
                <Image tintColor="white" source={Journal} />
            </Link>
        </Bar>
    )
}

export default NavBar

const Bar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: ${primaryColor};
    height: 48px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    z-index: 9998;
`