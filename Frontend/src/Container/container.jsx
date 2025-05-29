import React from 'react'

const Container = ({children}) => {
  return (
    <div style={
        {
            marginLeft: "7%",
            marginRight: "7%",
            boxSizing : "border-box"
        }
    }>
      {children}
    </div>
  )
}

export default Container
