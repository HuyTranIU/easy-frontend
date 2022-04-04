import { Slide } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import React, { forwardRef, useState } from 'react'
import FormModal from './FormModal'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function ModalDialog(props) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Leave
      </Button>
      <Dialog
        open={open}
        disableEscapeKeyDown
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth='md'
      >
        <DialogContent>
          <FormModal onhandleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ModalDialog
