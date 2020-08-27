import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList,TextInput } from 'react-native';
import{Header} from'./components/Header';
import Swipeout from 'react-native-swipeout';

export default class App  extends Component{

  state={
    eventContent:'',
    refresh:1,
    selectedItem:-1,
  }

  EventList=[]

  completedList=[]

  addEvent=()=>{
    
    let currentTime = new Date()
    let eventID=currentTime.getTime()
    let event={
      id:eventID,
      content:this.state.eventContent
    }
   this.EventList.push(event)
   if(this.state.refresh==1)
   this.setState({refresh:0})
   else
   this.setState({refresh:1})
  }

  deleteRecord=(index)=>{
    if(this.completedList.some((a)=>{return a==index})){
    this.EventList.splice(index,1)
    this.completedList.splice(index,1)
    if(this.state.refresh==1)
    this.setState({refresh:0})
    else
    this.setState({refresh:1})
    }else{
      if(this.state.refresh==1)
    this.setState({refresh:0})
    else
    this.setState({refresh:1})
    }
    
  }

  markDone=(index)=>{
    if(!this.completedList.some((a)=>{return a==index})){
     let originStr=this.EventList[index].content
     let newStr=originStr+'---> Completed!!'
     let eventCompleted={
      content: newStr,
      id:this.EventList[index].id
    }
    this.EventList.splice(index,1,eventCompleted)
    this.completedList.push(index)
    if(this.state.refresh==1)
    this.setState({refresh:0})
    else
    this.setState({refresh:1})
  }
  
  }

  
  recordBtn = [{ text: 'Done', backgroundColor: 'green', onPress: () => this.markDone(this.state.selectedItem) },{ text: 'Delete', backgroundColor: 'red', onPress: () => this.deleteRecord(this.state.selectedItem) }]


  renderItem=({item,index})=>(
    <View style={{width:'100%', backgroundColor:'pink'}}>
    <Swipeout  sensitivity={1} right={this.recordBtn} backgroundColor='white' autoClose={true} buttonWidth={100} onOpen={() => this.setState({ selectedItem: index})} onClose={() => this.setState({ selectedItem: -1})}>
  <Text style={{fontSize:20}} id={index}>{item.content}</Text>
   </Swipeout>
  </View>
  )

  render (){
    return(
    <View style={styles.container}>
     <Header></Header>
     <View style={{display:'flex',flexDirection:'row',height:40,marginTop:10}}>
            <Text style={{fontSize:30}}>Event: </Text>
            <TextInput style={{width:'80%',borderWidth:1, borderRadius:20,paddingHorizontal:10}} placeholder='Input event' onChangeText={text=>this.setState({ eventContent:text })}/>
            </View>
     <Button title='Add' onPress={()=>this.addEvent()} />
     <FlatList 
     style={{paddingHorizontal:10,marginTop:20}}
       data={this.EventList}
       renderItem={ this.renderItem}
       keyExtractor={event=>event.id}
     />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
});
