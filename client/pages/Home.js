import React, {useState} from 'react'
import { Text } from 'react-native'
import { Link, View, FlatList } from 'react-router-native'
import styled from 'styled-components'

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

const Home = () => {
    const [input, setInput] = useState(null)
    const [ingredientes, setIngrediente] = useState([])

    const addIngrediente = () => {
        setIngrediente([...ingredientes, input])
        setInput(null)
    }

    return (
        <Container>
            <Input onChangeText={text => setInput(text)} value={input} 
                placeholder="Digite um ingrediente aqui" onSubmitEditing={addIngrediente} />

            {ingredientes.map((ing, id) => <Text key={id} style={{fontSize: 18}}>{ing}</Text>)}
            {/*<Link to='/about'>
                <Text>Sobre nós</Text>
            </Link>*/}
        </Container>
    )
}

export default Home