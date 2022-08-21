import React from 'react'
import Alert from "@material-ui/lab/Alert";
import { useAlert } from './Alert.hook'

const AppAlert = () => {
    const {message, type} = useAlert()
    return message !== '' ? <Alert severity={type}>{message}</Alert> : <></>
}

export default AppAlert