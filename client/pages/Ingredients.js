import React, { useState, useEffect } from 'react'
import { Text, AsyncStorage, TouchableHighlight, Dimensions, View, ScrollView } from 'react-native'
import Cross from '../assets/cross.png'
import styled from 'styled-components'
import Modal from '../components/Modal';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const toString = (ar) => {
    if (!ar.length) return ''
    let parsedArray = '['
    ar.forEach((str, i) => {
        parsedArray += `"${str}"`
        if (i < ar.length - 1) parsedArray += ', '
        else parsedArray += ']'
    })
    return parsedArray
}

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([])
    const [modal, showModal] = useState(false)
    const [input, setInput] = useState(null)

    useEffect(() => {
        const fetchIngredients = async () => {
            const data = await AsyncStorage.getItem('ingredients')
            if (data) setIngredients(JSON.parse(data))
        }
        fetchIngredients()
    }, [])

    const updateIngredients = async (cmd, ing) => {
        let newIngredients
        if (cmd === 'add') newIngredients = [...ingredients, input]
        else newIngredients = ingredients.filter(e => e !== ing)
        const parsedIngredients = toString(newIngredients)

        await AsyncStorage.setItem('ingredients', parsedIngredients)
        setIngredients(newIngredients)
        setInput(null)
        showModal(false)
    }

    return (
        <React.Fragment>
            {modal && <Center style={{height: height - 56, left: width*0.5, top: 0}}>
                    <Modal updateIngredients={updateIngredients} input={input} setInput={setInput} />
            </Center>}

            <Container pointerEvents={modal ? 'none' : 'auto'} style={{opacity: modal ? 0.2 : 1, elevation: 4444}}>
                <TouchableHighlight onPress={() => showModal(true)}>
                    <Text>Click!!</Text>
                </TouchableHighlight>

                <ScrollView style={{width}}>
                    {ingredients.map((ing, id) => {
                        return (
                            <Item key={id} style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}>
                                <Text style={{fontSize: 18}}>{ing}</Text>
                                <TouchableHighlight onPress={() => updateIngredients('delete', ing)}>
                                    <Cancel source={Cross} />
                                </TouchableHighlight>
                            </Item>
                        )
                    })}
                </ScrollView>
            </Container>
        </React.Fragment>
    )
}

export default Ingredients

const Container = styled.View`
    flex: 1;
    width: ${width};
    align-items: center;
    margin-bottom: 56px;
`
const Item = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px 16px 8px 16px;
`
const Cancel = styled.Image`
    width: 16px;
    height: 16px;
`
const Center = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
`