import React, { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmDialog from "../../components/ConfirmDialog";
import ShiftHeader from "../../features/shift/ShiftHeader";
import Alert from "../../features/alert/Alert";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from './Shift.style'
import { useShift } from './Shift.hook'

interface ActionButtonProps {
  id: string;
  disabled: boolean
  onDelete: () => void;
}
const ActionButton: FunctionComponent<ActionButtonProps> = ({
  id,
  disabled,
  onDelete,
}) => {
  return (
    <div>
      <IconButton
        size="small"
        aria-label="delete"
        component={RouterLink}
        to={`/shift/${id}/edit`}
        disabled={disabled}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton 
        size="small" 
        aria-label="delete" 
        onClick={() => onDelete()}
        disabled={disabled}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Shift = () => {
  const classes = useStyles();
  const {
    rows,
    isLoading,
    showDeleteConfirm,
    deleteLoading,
    onDeleteClick,
    handleDelete,
    onCloseDeleteDialog,
} = useShift();

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton disabled={!!row.publishedAt} id={row.id} onDelete={() => onDeleteClick(row.id)} />
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <Alert />
            <ShiftHeader hidePublish={rows.length === 0} />
            <DataTable
              columns={columns}
              data={rows}
              pagination
              progressPending={isLoading}
            />
          </CardContent>
        </Card>
      </Grid>
      <ConfirmDialog
        title="Delete Confirmation"
        description={`Do you want to delete this data ?`}
        onClose={onCloseDeleteDialog}
        open={showDeleteConfirm}
        onYes={handleDelete}
        loading={deleteLoading}
      />
    </Grid>
  );
};

export default Shift;
