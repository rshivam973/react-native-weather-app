import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      position: 'relative',
      flexDirection:"column",
    },
    mainview:{
        flex:1,
      marginLeft:"4%",
      marginRight:"4%",
      position:"relative",
      zIndex:50,
    },
    inputbox: {
      position: 'relative',
      flex: 1,
    },
    safeareastyle: {
      display:"flex",
      flex: 1,
      marginTop:10,
      position:"relative"
    },
    bgimage: {
      position: 'absolute',
    },
  });