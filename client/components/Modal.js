import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, TouchableHighlight } from 'react-native'
import styled from 'styled-components'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Modal = ({ updateIngredients, input, setInput, amount, setAmount }) => {
    const [selected, changeSelected] = useState(1)

    const send = () => {
        if (input && amount) updateIngredients('add', input, selected)
    }

    return (
        <Container style={{width: 0.8*width, height: 0.43*height, elevation: 9999, zIndex: 9999}}>
            <Input onChangeText={text => setInput(text)} value={input} 
                    placeholder="Digite um ingrediente" />
            <Center>
                <Switch>
                    <Box onPress={() => changeSelected(1)} style={{backgroundColor: selected === 1 ? 'green' : 'white'}}>
                        <Text style={{color: selected === 1 ? 'white' : 'black'}}>Unidade</Text>
                    </Box>
                    <Box onPress={() => changeSelected(2)} style={{backgroundColor: selected === 2 ? 'green' : 'white'}}>
                        <Text style={{color: selected === 2 ? 'white' : 'black'}}>Peso</Text>
                    </Box>
                </Switch>
                <Number placeholder="Quantidade" onChangeText={number => setAmount(number)} value={amount} />
                <Text>{selected === 1 ? 'unidades' : 'gramas'}</Text>
            </Center>
            <TouchableHighlight onPress={send} style={{marginTop: 8}}>
                <Button style={{backgroundColor: input && amount ? '#036b2e' : '#7a7a7a'}}>
                    <Text style={{fontSize: 24, color: 'white'}}>Confirmar</Text>
                </Button>
            </TouchableHighlight>
        </Container>
    )
}

export default Modal

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 3px solid black;
    background-color: white;
    position: absolute;
    padding: 12px 6px 12px 6px;
`
const Input = styled.TextInput`
    width: 90%;
    padding: 6px 0px 6px 12px;
    border-color: #036b2e;
    border-width: 2px;
    border-radius: 4px;
    font-size: 22px;
`
const Switch = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 12px;
`
const Box = styled.TouchableHighlight`
    margin: 0px 6px 0px 6px;
    width: 75px;
    padding: 6px 0px 6px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Number = styled.TextInput`
    width: 125px;
    font-size: 16px;
    padding: 4px 0px 4px 8px;
    border-color: #036b2e;
    border-width: 1px;
    border-radius: 4px;
`
const Center = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Button = styled.View`
    height: 42px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`