import React, { useState, useEffect } from 'react'
import { Text, AsyncStorage, TouchableHighlight } from 'react-native'
import Cross from '../assets/cross.png'
import styled from 'styled-components'

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
    const [input, setInput] = useState(null)
    const [ingredients, setIngredients] = useState([])

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
    }

    return (
        <Container>
            <Input onChangeText={text => setInput(text)} value={input} 
                placeholder="Digite um ingrediente aqui" onSubmitEditing={() => updateIngredients('add', input)} />

            <Container>
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
            </Container>
        </Container>
    )
}

export default Ingredients

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const Input = styled.TextInput`
    width: 80%;
    padding: 6px 0px 6px 12px;
    border-color: #036b2e;
    border-width: 2px;
    border-radius: 4px;
    margin-bottom: 64px;
    font-size: 22px;
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
