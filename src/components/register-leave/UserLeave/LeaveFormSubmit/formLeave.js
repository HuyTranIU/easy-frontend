import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CardContent, Container, DialogActions, FormControl, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import CheckLeaveAll from '../../../../components/form-controller/CheckBox'
import InputField from '../../../../components/form-controller/InputField'
import RadioRange from '../../../../components/form-controller/RadioRange'
import TimePickerLeave from '../../../../components/form-controller/TimePicker'

function FormLeave(props) {
  const { onhandleClose, onSubmit } = props
  const registerDate = useRef(moment().format('DD-MM-YY hh:mm'))
  const schema = yup.object({
    reason: yup.string()
      .required('Please enter reason')
      .max(100, 'Up to 100 characters')
  }).required()

  const form = useForm({
    defaultValue: {
      reason: '',
      rangeStart: new Date(''),
      rangeEnd: new Date(''),
      radioGroup: '',
      checkLeaveAll: false
    },
    resolver: yupResolver(schema)
  })

  const handleRegiseter = (values) => {
    if (onSubmit) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleRegiseter)}>
      <Container>
        <CardContent>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            alignItems='center'
          >
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>
                Rergistration date:
              </Typography>
            </Grid>
            <Grid item sm={8} md={8} lg={9}>
              <Typography variant='body1'>{registerDate.current}</Typography>
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>
                Register for date:
              </Typography>
            </Grid>
            <Grid item sm={8} md={8} lg={9}>
              <Typography variant='body1'>2020-02-20</Typography>
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>Check-in:</Typography>
            </Grid>
            <Grid item sm={8} md={3} lg={3}>
              <Typography variant='body1'>08:10</Typography>
            </Grid>
            <Grid item sm={4} md={3} lg={2}>
              <Typography variant='body1'>Check-out:</Typography>
            </Grid>
            <Grid item sm={8} md={2} lg={4}>
              <Typography variant='body1'>17:01</Typography>
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>Late time:</Typography>
            </Grid>
            <Grid item sm={8} md={3} lg={3}>
              <Typography variant='body1'>
                08:10
              </Typography>
            </Grid>
            <Grid item sm={4} md={3} lg={2}>
              <Typography variant='body1'>Early time:</Typography>
            </Grid>
            <Grid item sm={8} md={2} lg={4}>
              <Typography variant='body1'>17:01</Typography>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <CheckLeaveAll name='checkLeaveAll' label='Leave all day' form={form} />
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>Range:</Typography>
            </Grid>
            <Grid item sm={6} md={4} lg={3}>
              <Box sx={{ display: 'flex' }}>
                <TimePickerLeave name='rangeStart' form={form} />
                <Typography
                  variant='body1'
                  sx={{ margin: 'auto', fontWeight: '900', padding: '0 10px 0 10px' }}
                >
                  to
                </Typography>
                <TimePickerLeave name='rangeEnd' form={form} />
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6} sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex' }}>
                <FormControl size='small' sx={{ margin: 'auto' }}>
                  <RadioRange name='radioGroup' form={form} />
                </FormControl>
              </Box>
              <Box sx={{ display: 'flex', margin: 'auto', marginLeft: '1px' }}>
                <Typography variant='body1'>|</Typography>
                <Typography variant='body1'>Time count:</Typography>
                <Typography
                  variant='body1'
                  sx={{ marginLeft: 0.5, color: 'red' }}
                >
                  00:14
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={4} md={4} lg={3} alignSelf='flex-start'>
              <Typography variant='body1'>Reason:</Typography>
            </Grid>
            <Grid item sm={8} md={8} lg={9}>
              <InputField name='reason' label='Reason' form={form} />
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>
                Status:
              </Typography>
            </Grid>
            <Grid item sm={8} md={8} lg={9}>
              <Typography variant='body1'>Sent</Typography>
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <Typography variant='body1'>
                Tran Doan Huy
              </Typography>
            </Grid>
            <Grid item sm={8} md={8} lg={9}>
              <Typography variant='body1'>Confirmed</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Container>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant='contained'>Update</Button>
        <Button variant='contained'>Delete</Button>
        <Button type='submit'variant='contained'>
          Register
        </Button>
        <Button onClick={() => onhandleClose()} variant='contained'>
          Cancel
        </Button>
      </DialogActions>
    </form >
  )
}

export default FormLeave
