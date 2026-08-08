'use client'
import React, { useEffect } from 'react'
import api from '../lib/axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/slices/userdata'
import { setHodData } from '@/redux/slices/hod'
import { setstudentData } from '@/redux/slices/studentData'
const useCurrentstudent = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchCurrentStudent = async()=>{
            try {
                const res = await api.get("/get-current-student/" ,{withCredentials:true})
                dispatch(setstudentData(res.data.data))

            } catch (error) {
                console.log(error)

            }
        }
        fetchCurrentStudent()

    } , [])


}

export default useCurrentstudent
