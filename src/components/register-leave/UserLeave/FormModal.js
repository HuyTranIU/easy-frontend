import { CardHeader } from '@mui/material'
import { default as React } from 'react'
import FormLeave from './LeaveFormSubmit/formLeave'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { register } from '../../../redux/registerLeaveSlice'

function FormModal({ onhandleClose }) {
  const dispatch = useDispatch()

  const handleSubmit = async(value) => {
    try {
      const action = register(value)
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)
      onhandleClose()
    } catch (error) {
      onhandleClose()
    }
  }

  return (
    <>
      <CardHeader
        title='Register Leave'
        sx={{ borderBottom: '1px solid' }}
      />
      <FormLeave onhandleClose={onhandleClose} onSubmit={handleSubmit} />
    </>
  )
}

export default FormModal
