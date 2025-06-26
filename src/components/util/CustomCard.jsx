import React from 'react'
import Card from '@mui/material/Card';
import { CardContent, CardHeader } from '@mui/material';
import './Layout/responsive.css';

const CustomCard = ({icon, title, description}) => {
  return (
    <Card variant='outlined' style={{boxShadow:'3px', borderRadius:'10px'}} className='bg-tech-gradient custom-card'>
        <div className='flex justify-center p-1 m-1 custom-card-icon'>{icon}</div>
        <CardContent>
            <h2 className='font-bold text-red-400 m-1 p-1 text-base sm:text-lg md:text-xl'>{title}</h2>
            <p className='text-xs sm:text-sm text-pretty text-gray-800'>{description}</p>
        </CardContent>
    </Card>
  )
}

export default CustomCard