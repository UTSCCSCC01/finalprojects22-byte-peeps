import React from 'react'
import { CardContent, Card } from '@mui/material';


const CardCharts = (props: any) => {
  return (
    <Card>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  )
}

export default CardCharts