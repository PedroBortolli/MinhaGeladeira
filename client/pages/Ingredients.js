import React, { useState, useEffect } from 'react'
import { Text, AsyncStorage, TouchableHighlight, Dimensions, View, ScrollView } from 'react-native'
import Cross from '../assets/cross.png'
import styled from 'styled-components'
import Modal from '../components/Modal'

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
    const [quantities, setQuantities] = useState([])
    const [modal, showModal] = useState(false)
    const [input, setInput] = useState(null)
    const [amount, setAmount] = useState(null)

    useEffect(() => {
        const fetchIngredients = async () => {
            
            const ing = await AsyncStorage.getItem('ingredients')
            if (ing) setIngredients(JSON.parse(ing))
            const qnt = await AsyncStorage.getItem('quantities')
            if (qnt) setQuantities(JSON.parse(qnt))
        }
        fetchIngredients()
    }, [])

    const updateIngredients = async (cmd, ing, type) => {
        let newIngredients, newQuantities
        if (cmd === 'add') {
            newIngredients = [...ingredients, input]
            newQuantities = [...quantities, type === 2 ? `${amount}g` : amount]
        }
        else {
            const id = ingredients.findIndex(e => e === ing)
            newIngredients = ingredients.filter(e => e !== ing)
            newQuantities = [...quantities.slice(0, id), ...quantities.slice(id+1)]
        }

        const parsedIngredients = toString(newIngredients)
        const parsedQuantities = toString(newQuantities)
        await AsyncStorage.setItem('ingredients', parsedIngredients)
        await AsyncStorage.setItem('quantities', parsedQuantities)

        setIngredients(newIngredients)
        setQuantities(newQuantities)
        setInput(null)
        setAmount(null)
        showModal(false)
    }

    return (
        <React.Fragment>
            {modal && <Center style={{height: height - 56, left: width*0.5, top: 0}}>
                    <Modal updateIngredients={updateIngredients} input={input} setInput={setInput} amount={amount} setAmount={setAmount} />
            </Center>}

            <Container pointerEvents={modal ? 'none' : 'auto'} style={{opacity: modal ? 0.2 : 1, elevation: 4444}}>
                <TouchableHighlight onPress={() => showModal(true)}>
                    <Button>
                        <Text style={{fontSize: 24, color: 'white'}}>Adicionar</Text>
                    </Button>
                </TouchableHighlight>

                {(ingredients.length > 0 && quantities.length > 0) ?
                    <ScrollView style={{width}}>
                        {ingredients.map((ing, id) => {
                            return (
                                <View key={id} style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}>
                                    <Item>
                                        <Text style={{fontSize: 18}}>{ing}</Text>
                                        <TouchableHighlight onPress={() => updateIngredients('delete', ing)}>
                                            <Cancel source={Cross} />
                                        </TouchableHighlight>
                                    </Item>
                                    {quantities[id] &&
                                        <View>
                                            <Amount>{`${quantities[id]} ${quantities[id].substr(quantities[id].length - 1) !== 'g' ? 'unidades': ''}`}</Amount>
                                        </View>
                                    }
                                </View>
                            )
                        })}
                    </ScrollView>
                    :
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center'}}>Sem ingredientes</Text>
                        <Text style={{textAlign: 'center'}}>Clique no botão acima para adicionar</Text>
                        <Text style={{textAlign: 'center'}}>...ou tire uma foto de uma nota fiscal</Text>
                    </View>
                }
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
    padding: 8px 16px 4px 16px;
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
const Button = styled.View`
    background-color: #036b2e;
    height: 42px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
`
const Amount = styled.Text`
    padding: 0px 0px 4px 16px;
    font-style: italic;
`