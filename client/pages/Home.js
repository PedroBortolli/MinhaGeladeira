import React, {useState} from 'react'
import { Text } from 'react-native'
import { Link, View, FlatList } from 'react-router-native'
import styled from 'styled-components'

const Home = () => {
    return (
        <Link to='/about'>
            <Text>Sobre nós</Text>
        </Link>
    )
}

export default Home