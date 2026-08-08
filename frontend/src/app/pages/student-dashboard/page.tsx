'use client'
import useCurrentstudent from '@/app/hooks/useCurrentStudent'
import api from '@/app/lib/axios'
import { RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const page = () => {

    useCurrentstudent()

    const { studentData }: any = useSelector((state: RootState) => state.student)
    console.log(studentData)
  return (
    <div>page</div>
  )
}

export default page
