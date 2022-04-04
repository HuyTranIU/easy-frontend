import React from 'react'
import {
  CardHeader,
  Container,
  Dialog,
  DialogTitle,
  Slide,
  useMediaQuery
} from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
const ModalCommon = ({ children, open, handleClose, modalName }) => {
  const matches = useMediaQuery('(max-width:600px)')

  return (
    <Dialog
      fullScreen={!!matches}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableEscapeKeyDown
      onClose={handleClose}
      maxWidth='md'
      fullWidth={true}
    >
      <DialogTitle
        borderBottom='1px solid'
        sx={{
          paddingY: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <CardHeader
          title={modalName}
        />
      </DialogTitle>
      <Container>{children}</Container>
    </Dialog>
  )
}

export default ModalCommon
