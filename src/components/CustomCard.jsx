import React from 'react'
import Card from '@mui/material/Card';
import { CardContent, CardHeader } from '@mui/material';

const CustomCard = ({icon, title, description}) => {
  return (
    <Card variant='outlined' style={{boxShadow:'3px', borderRadius:'10px'}} className='bg-tech-gradient'>
        <div className='flex justify-center p-1 m-1'>{icon}</div>
        <CardContent>
            <h2 className='font-bold text-red-400 m-1 p-1'>{title}</h2>
            <p className='text-sm text-pretty text-gray-800'>{description}</p>
        </CardContent>
    </Card>
  )
}

export default CustomCard