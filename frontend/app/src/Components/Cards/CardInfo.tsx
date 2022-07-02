import React from 'react'
import { CardContent, Card } from '@mui/material';

const CardInfo = (props: any) => {
  return (
    <Card>
      <CardContent style={{display: "flex", justifyContent: "space-evenly", padding: "10px", flexWrap: "wrap"}}>
        {props.children}
      </CardContent>
    </Card>
  )
}

export default CardInfo