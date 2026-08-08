'use client'
import React, { useEffect } from 'react'
import api from '../lib/axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/slices/userdata'
import { setHodData } from '@/redux/slices/hod'
const useCurrentHOD = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchCurrentHod = async()=>{
            try {
                const res = await api.get("/get-current-hod/" ,{withCredentials:true})
                // console.log("this is res", res)
                dispatch(setHodData(res.data))

            } catch (error) {
                console.log(error)

            }
        }
        fetchCurrentHod()

    } , [])


}

export default useCurrentHOD
