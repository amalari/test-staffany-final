import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
  right: {
    marginLeft: "auto",
  },
  backBtn: {
    backgroundColor: theme.color.red,
    color: "white",
  },
  saveBtn: {
    backgroundColor: theme.color.turqouise,
    color: "white",
    marginLeft: "auto",
  },
}));
