'use client'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import useCurrentUser from '../hooks/useCurrentUser'
import StudentForm from './StudentForm'
import FaculityForm from './FaculityForm'
import HodForm from './HodForm'
import { useEffect, useState } from 'react'
import api from '../lib/axios'
import { redirect } from 'next/navigation'
import useCurrentHOD from '../hooks/useCurrentHOD'
import useCurrentstudent from '../hooks/useCurrentStudent'
import useCurrentFaculty from '../hooks/useCurrentFaculty'


const Hero = () => {
    useCurrentUser()
    useCurrentHOD()
    useCurrentstudent()
    useCurrentFaculty()








    const { userData }: any = useSelector((state: RootState) => state.user)
    const { hodData }: any = useSelector((state: RootState) => state.hod)
    const { studentData }: any = useSelector((state: RootState) => state.student)
    const { facultyData }: any = useSelector((state: RootState) => state.faculty)

    if (userData?.user_profile?.role == "student") {


        if (studentData == undefined) {

            return <StudentForm />
        }
        else {
            redirect("/pages/student-dashboard")

        }

    }
    if (userData?.user_profile?.role == "faculty") {

        if (facultyData == undefined) {
            return <FaculityForm />
        }
        else {
            redirect("/pages/faculty-dashboard")
        }

    }

    if (userData?.user_profile?.role == "hod") {

        if (hodData == undefined) {
            return <HodForm />
        }
        else {
            redirect("/pages/hod-dashboard")
        }

    }


}

export default Hero
