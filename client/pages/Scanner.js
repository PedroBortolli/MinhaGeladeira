import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import styled from 'styled-components'
import GreenSpinner from '../assets/green-spinner.gif'
import Circle from '../assets/circle.png'
import fetchApi from '../fetch'

const Scanner = ({showNavBar}) => {
    const [cameraPermission, setCameraPermission] = useState(null)
    const [base64, setBase64] = useState(null)
    const [loading, setLoading] = useState(false)
    const [itens, setItens] = useState([])
    const [photoRead, setPhotoRead] = useState(false)
    const camera = useRef(null)

    useEffect(() => {
        const ask = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA)
            setCameraPermission(status === 'granted')
        }
        ask()
    }, [])

    const takePhoto = async () => {
        if (camera && camera.current) {
            setLoading(true)
            const photo = await camera.current.takePictureAsync({quality: 1.0, base64: true})
            if (photo.base64) setBase64(`data:image/jpeg;base64,${photo.base64}`)
            setLoading(false)
            showNavBar(true)
        }
    }

    const sendPhoto = async () => {
        setLoading(true)
        setPhotoRead(false)
        const response = await fetchApi('POST', 'https://minhageladeira.herokuapp.com/scan', base64)
        if (response.ok && response.Products && response.Products.length > 0) {
            setItens(response.Products)
        }
        setPhotoRead(true)
        setLoading(false)
    }

    const imagePreview = {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        marginTop: -96
    }

    return (
        cameraPermission === null ?
            <Center>
                <Image source={GreenSpinner} style={{width: 96, height: 96}} />
                <Text>Aguardando permissão para utilizar a câmera do dispositivo...</Text>
            </Center>
            :
            <View style={{flex: 1}}>
                {photoRead ?
                    itens.length > 0 ?
                        <Center>
                            {itens.map(item => <Text key={item}>{item}</Text>)}
                        </Center>
                    :
                    <Text style={{textAlign: 'center'}}>
                        A imagem não parece ser uma nota fiscal ou não possui itens...
                    </Text>
                :
                    base64 ?
                    <Container>
                        {loading &&
                            <Center style={{elevation: 998}}>
                                <Image source={GreenSpinner} style={{width: 96, height: 96}} />
                                <Text style={{marginTop: 16, fontSize:22}}>Lendo imagem...</Text>
                            </Center>
                        }
                        <Center style={{height: 'auto'}}>
                            <Title>Obter itens a partir da foto</Title>
                        </Center>
                        {!loading &&
                            <View style={{flex: 1}}>
                                <Image source={{uri: base64}} style={imagePreview} />
                                <Confirmation>
                                    <Box style={{backgroundColor: '#b1e3fa'}} onPress={sendPhoto}>
                                        <Button>Confirmar foto</Button>
                                    </Box>
                                    <Box style={{backgroundColor: '#f0b1ad'}} onPress={() => setBase64(null)}>
                                        <Button>Capturar novamente</Button>
                                    </Box>
                                </Confirmation>
                            </View>
                        }
                    </Container>
                    :
                    <Camera style={{flex: 1, marginTop: -16, elevation: 999}} type={Camera.Constants.Type.back} ref={camera}>
                        {loading &&
                            <Center>
                                <Image source={GreenSpinner} style={{width: 96, height: 96}} />
                            </Center>
                        }
                        <BottomBar>
                            <TouchableOpacity onPress={takePhoto} style={{marginBottom: 24}}>
                                <Image source={Circle} style={{width: 64, height: 64}} />
                            </TouchableOpacity>
                        </BottomBar>
                    </Camera>
                }
            </View>
    )
}

export default Scanner

const Center = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`
const BottomBar = styled.View`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
`
const Container = styled.View`
    flex: 1;
`
const Confirmation = styled.View`
    width: 100%;
    height: 92px;
    position: absolute;
    bottom: 42;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const Box = styled.TouchableOpacity`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.Text`
    font-size: 26;
    color: #0d9431;
    font-weight: 900;
`
const Button = styled.Text`
    font-size: 20;
    text-align: center;
`