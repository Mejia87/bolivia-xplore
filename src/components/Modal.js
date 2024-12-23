import React from 'react'
import { StyleSheet} from 'react-native'
import { Overlay } from '@rneui/themed';

const ModalMap = ({isVisible = false, setIsVisible = () => {},children = null}) => {
  return (
    <Overlay
        isVisible={isVisible}
        overlayStyle={styles.overlay}
        onBackdropPress={() => setIsVisible(false)}
        
    >
       {children} 
    </Overlay>
  )
}

export default ModalMap

const styles = StyleSheet.create({
    overlay: {
        width:'90%',
        maxHeight:'80%',
    }
})