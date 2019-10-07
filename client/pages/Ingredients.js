import React, {useState} from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

const Ingredients = () => {
    const [input, setInput] = useState(null)
    const [ingredients, setIngredient] = useState([])

    const addIngrediente = () => {
        setIngredient([...ingredients, input])
        setInput(null)
    }

    return (
        <Container>
            <Input onChangeText={text => setInput(text)} value={input} 
                placeholder="Digite um ingrediente aqui" onSubmitEditing={addIngrediente} />

            {ingredients.map((ing, id) => <Text key={id} style={{fontSize: 18}}>{ing}</Text>)}
        </Container>
    )
}

export default Ingredients

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
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
