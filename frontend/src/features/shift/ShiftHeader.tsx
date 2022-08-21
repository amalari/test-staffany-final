import React from 'react'
import { format, parseISO } from 'date-fns'
import { Box, Button } from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'
import { WeekPicker } from '../../components/Picker'
import { useStyles } from './ShiftHeader.style'
import { useShiftHeader } from './ShiftHeader.hook'

interface ShiftHeaderProps {
    hidePublish: boolean
}

const ShiftHeader: React.FC<ShiftHeaderProps> = ({
    hidePublish
}) => {
    const classes = useStyles()
    const {
        publishedAt,
        dateFilter,
        onPublish,
        onCreate,
        onDateFilterChange
    } = useShiftHeader()
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.container}>
             <Box>
             <WeekPicker value={parseISO(dateFilter)} inputClassName={publishedAt ? classes.textPublishedColor : ''} onChange={onDateFilterChange} />
             </Box>
             <Box>
                {publishedAt && (
                    <span className={classes.textPublishedAt}>
                        <CheckCircleOutline className={classes.iconPublishedAt} /> 
                        {`${format(parseISO(publishedAt), 'dd MMM yyyy, hh:mm aa')}`}
                    </span>
                )}
                <Button disabled={!!publishedAt} onClick={onCreate} variant="outlined" className={classes.btnAddShift}>Add Shift</Button>
                {!hidePublish && (
                    <Button disabled={!!publishedAt} onClick={onPublish} variant="contained" color="primary" className={classes.btnPublish}>
                        Publish
                    </Button>
                )}
             </Box>
        </Box>
    )
}

export default ShiftHeader