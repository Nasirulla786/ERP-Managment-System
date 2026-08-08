'use client'
import React, { useEffect } from 'react'
import api from '../lib/axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/slices/userdata'
import { setHodData } from '@/redux/slices/hod'
import { setstudentData } from '@/redux/slices/studentData'
import { setFacultyData } from '@/redux/slices/faculty'
const useCurrentFaculty = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchCurrentFaculty = async()=>{
            try {
                const res = await api.get("/get-current-faculty/" ,{withCredentials:true})
                dispatch(setFacultyData(res.data.data))

            } catch (error) {
                console.log(error)

            }
        }
        fetchCurrentFaculty()

    } , [])


}

export default useCurrentFaculty
