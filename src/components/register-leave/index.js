import React, { useState } from 'react'
import LeaveModal from './ConfirmLeave'
import ModalDialog from './UserLeave/Modal'
import { Button } from '@mui/material'
import ViewModalLeave from '../registerleave/ViewModalLeave'

function RegisterLeave(props) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <ModalDialog />
      <Button
        variant='contained'
        size='small'
        onClick={handleClickOpen}
        sx={{ justifyItems: 'flex-end' }}
      >
        Admin ConfirmLeave
      </Button>
      <LeaveModal
        onOpen={open}
        onHandleClose={handleClose}
        modalName='Admin Confirm Leave'
      />
      <ViewModalLeave />
    </div>
  )
}

export default RegisterLeave
