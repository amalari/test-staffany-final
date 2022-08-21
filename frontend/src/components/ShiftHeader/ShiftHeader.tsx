import React from 'react'
import { format, parseISO } from 'date-fns'
import { Box, Button } from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'
import { WeekPicker } from '../Picker'
import { useStyles } from './ShiftHeader.styles'

interface ShiftHeaderProps {
    onDateFilterChange: (date: Date) => void
    onCreate: () => void
    onPublish?: () => void
    publishedAt: string | null
}

const ShiftHeader: React.FC<ShiftHeaderProps> = ({
    onDateFilterChange,
    onCreate,
    onPublish,
    publishedAt
}) => {
    const classes = useStyles()
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.container}>
             <Box>
             <WeekPicker inputClassName={publishedAt ? classes.textPublishedColor : ''} onChange={onDateFilterChange} />
             </Box>
             <Box>
                {publishedAt && (
                    <span className={classes.textPublishedAt}>
                        <CheckCircleOutline className={classes.iconPublishedAt} /> 
                        {`${format(parseISO(publishedAt), 'dd MMM yyyy, hh:mm aa')}`}
                    </span>
                )}
                <Button disabled={!!publishedAt} onClick={onCreate} variant="outlined" className={classes.btnAddShift}>Add Shift</Button>
                {onPublish && (
                    <Button disabled={!!publishedAt} onClick={onPublish} variant="contained" color="primary" className={classes.btnPublish}>
                        Publish
                    </Button>
                )}
             </Box>
        </Box>
    )
}

export default ShiftHeader