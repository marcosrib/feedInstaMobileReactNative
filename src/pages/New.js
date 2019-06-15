

import React, { Component } from 'react';
import { Text, View, TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker'
import api from '../services/api'


export default class New extends Component {

    state = {
        image: null,
        preview:null,
        author: "",
        descriptions: "",
        hashtags: "",
        place: ""
    }


    handleSelectImage =()=> {
        ImagePicker.showImagePicker({
            title:  'Seleciona imagm'
        }, upload => {
          if(upload.error) {
              console.log(error);
          } else if(upload.didCancel){
            console.log("imagem Camcelada");
          } else {
              const preview = {
                  uri: `data:image/png;base64,${upload.data}`
              }

              let prefix;
              let ext;
              if(upload.fileName) {
                  [prefix,ext] = upload.fileName.split('.')
                  ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext
              } else {
                  prefix = new Date.getTime();
                  ext = 'jpg';
              }
              const image = {
                  uri: upload.uri,
                  type: upload.type,
                  name: `${prefix}.${ext}`
              }

              this.setState({preview,image})
          }
        })
    }

    handleSubmit =  async e => {
      
        
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('descriptions', this.state.descriptions);
        data.append('hashtags', this.state.hashtags);
        data.append('place', this.state.place);
        console.log(data); 
        
        await api.post('posts', data)

        this.props.navigation.navigate('Feed') 



    }

    render() {
        
        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.selectedButton} onPress={this.handleSelectImage} >
                    <Text style={styles.selectedButtonText}>Selecione imagem</Text>
                </TouchableOpacity>

                {this.state.preview && <Image style={styles.preview} source={this.state.preview} /> }
                <TextInput style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder="nome author"
                    placeholderTextColor="#999"
                    value={this.state.author}
                    onChangeText={author => this.setState({ author })}
                />
                <TextInput style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder="nome descriptions"
                    placeholderTextColor="#999"
                    value={this.state.descriptions}
                    onChangeText={descriptions => this.setState({ descriptions })}
                />
                <TextInput style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder="nome hashtags"
                    placeholderTextColor="#999"
                    value={this.state.hashtags}
                    onChangeText={hashtags => this.setState({ hashtags })}
                />
                <TextInput style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder="nome place"
                    placeholderTextColor="#999"
                    value={this.state.place}
                    onChangeText={place => this.setState({ place })}
                />

                <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit} >
                <Text style={styles.shareButtonText}>Compartilhar</Text>
            </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({

        container: {
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 30,
        },
      
        selectedButton: {
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#CCC',
          borderStyle: 'dashed',
          height: 42,
      
          justifyContent: 'center',
          alignItems: 'center',
        },
      
        selectedButtonText: {
          fontSize: 16,
          color: '#666',
        },
      
        preview: {
          width: 100,
          height: 100,
          marginTop: 10,
          alignSelf: 'center',
          borderRadius: 4,
        },
      
        input: {
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 15,
          marginTop: 10,
          fontSize: 16,
        },
      
        shareButton: {
          backgroundColor: '#7159c1',
          borderRadius: 4,
          height: 42,
          marginTop: 15,
      
          justifyContent: 'center',
          alignItems: 'center',
        },
      
        shareButtonText: {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#FFF',
        },
    
});

