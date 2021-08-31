import React from 'react'
import { Text } from 'react-native'
import { fonts } from 'styles'

const MText = ({
  bold, 
  medium,
  textStyle, 
  children, 
  ...props
}) => {
  return (
    <Text 
      allowFontScaling={false} 
      style={[{fontFamily: (bold) ? fonts.bold : (medium) ? fonts.medium : fonts.normal}, textStyle]}
      {...props}
    > 
      {children}
    </Text>
  )
}


export default MText