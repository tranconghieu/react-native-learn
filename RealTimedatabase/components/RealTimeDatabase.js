import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, TextInput,
    TouchableOpacity, FlatList,

} from 'react-native';
import Firebase from 'firebase';


let config = {
    apiKey: "AIzaSyDXnXroOcGCHcJaLE9s2pDQPP96zPjCXlo",
    authDomain: "javascript-bac78.firebaseapp.com",
    databaseURL: "https://javascript-bac78.firebaseio.com",
    projectId: "javascript-bac78",
    storageBucket: "javascript -bac78.appspot.com ",
    messagingSenderId: " 208220183696 ",
    appId: " 1: 208220183696: web: f4c06f8e040a77df "
};
const app = Firebase.initializeApp(config);
const db = app.database();
const itemRef = db.ref('/animals');
// const rootRef = firebase.database().ref();
// const animalRef = rootRef.child('animal');
export default class RealTimeDatabase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: [],
            newNameAnimal: '',
            loading: false
        }
    }
    componentDidMount(){
        itemRef.on('value',(childSnapshot) => {
            const animalFirebase = [];
            childSnapshot.forEach((doc) =>{
                animalFirebase.push({
                    key : doc.key,
                    animalname : doc.toJSON().nameAnimal
                });
            });
            this.setState({ animal : animalFirebase });
            console.log(`animal ${JSON.stringify( this.state.animal)}`);
        })
    }
    onAddNameAnimal = () => {
        if (this.state.newNameAnimal.trim() == '') {
            alert('Animal name is Black');
            return;
        }
        db.ref('/animals').push({
            nameAnimal : this.state.newNameAnimal
        }).then(
            ()=>{
                console.log('inserted');
                this.setState({newNameAnimal : ''})
            }
        )
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.box}>
                    <TextInput
                        style={styles.txtInput}
                        placeholder='enter task Animal Name'
                        placeholderTextColor='white'
                        keyboardType='default'
                        autoCapitalize='none'
                        value = {this.state.newNameAnimal}
                        onChangeText={
                            (text => {
                                this.setState({ newNameAnimal: text })
                            })
                        }
                    />
                    <TouchableOpacity
                        onPress={this.onAddNameAnimal}
                        style={styles.bntAdd}
                    >
                        <Text style={{ color: 'white' }}>ADD</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.animal.length > 0 ? (
                        <FlatList
                    data={this.state.animal}
                    renderItem={({ item, index }) => {
                        return (
                            <Text>{ item.animalname }</Text>
                        )
                    }}
                    keyExtractor = {(item, index) => item.key}
                >

                </FlatList>
                    ): (
                        <Text>data is black</Text>
                    )
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        backgroundColor: 'green',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        height: 40,
        width: 200,
        borderColor: 'white',
        color: 'white',
        borderWidth: 1
    },
    bntAdd: {
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 30,
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});