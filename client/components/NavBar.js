import React from 'react'
import { View, Text, Image } from 'react-native'
import { Link } from 'react-router-native'
import styled from 'styled-components'
import Camera from '../assets/camera.png'
import Journal from '../assets/journal.png'
import Meal from '../assets/meal.png'

const NavBar = () => {
    return (
        <Bar>
            <Link to='/ingredients'>
                <Image source={Meal} />
            </Link>
            <Link to='/about'>
                <Image source={Camera} />
            </Link>
            <Link to='/about'>
                <Image source={Journal} />
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
    background-color: #0d9431;
    height: 48px;
    width: 100%;
    position: absolute;
    bottom: 0px;
`