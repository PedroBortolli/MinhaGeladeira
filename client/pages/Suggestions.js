import React from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import styled from 'styled-components'
import Header from '../components/Header'
import { primaryColor } from '../colors'
import clock from '../assets/clock.png'
import done from '../assets/done.png'

const width = Dimensions.get('window').width

const Suggestion = ({ title, time, ingredients }) => {
    return (
        <Box>
            <Center style={{marginBottom: 32}}>
                <Name>{title}</Name>
                <Center style={{flexDirection: 'row'}}>
                    <Clock source={clock} />
                    <Time>{time}</Time>
                </Center>
            </Center>
            <Center>
                {ingredients && ingredients.map(ingredient => {
                    return (
                        <Center key={ingredient} style={{flexDirection: 'row'}}>
                            <Text style={{paddingBottom: 4}}>{ingredient}</Text>
                            <Done tintColor="#3bb85c" source={done} />
                        </Center>
                    )
                })}
            </Center>
        </Box>
    )
}

const Suggestions = () => {
    return (
        <React.Fragment>
            <Container>
                <Header />
                <ScrollView style={{width, marginBottom: 48}} 
                        contentContainerStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Title>Sugestões de Receitas</Title>
                    <Suggestion title="Brigadeiro" time="30 minutos" ingredients={[
                        'Leite condensado (1 lata)', 'Chocolate em pó (2 colheres de sopa)', 'Manteiga (2 colheres de sopas)']} />
                    <Suggestion title="Waffle na chapa" time="15 minutos" ingredients={[
                        'Waffle (ao critério)', 'Manteira (1 colher de sopa)']} />
                    <Suggestion title="Gelatina" time="20 minutos" ingredients={['1 caixa de gelatina em pó']} />
                </ScrollView>
            </Container>
        </React.Fragment>
    )
}

export default Suggestions

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`
const Title = styled.Text`
    font-size: 22px;
    margin-bottom: 24px;
    color: ${primaryColor};
`
const Box = styled.View`
    width: 90%;
    border-style: dashed;
    border-radius: 1px;
    border-color: ${primaryColor};
    border-width: 1px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
`
const Name = styled.Text`
    font-size: 20px;
    padding-bottom: 2px;
    color: ${primaryColor};
    font-weight: 900;
`
const Center = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Clock = styled.Image`
    width: 10px;
    height: 10px;
    margin-right: 6px;
`
const Time = styled.Text`
    font-size: 12px;
    font-style: italic;
`
const Done = styled.Image`
    width: 16px;
    height: 16px;
    margin-left: 6px;
`