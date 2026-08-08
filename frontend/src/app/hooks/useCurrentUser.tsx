'use client'
import React, { useEffect } from 'react'
import api from '../lib/axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/slices/userdata'
const useCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchCurrentUser = async()=>{
            try {
                const res = await api.get("/current-user/" , {withCredentials:true})
                dispatch(setUserData(res.data.user))

            } catch (error) {
                console.log(error)

            }
        }
        fetchCurrentUser()

    } , [])

}

export default useCurrentUser
