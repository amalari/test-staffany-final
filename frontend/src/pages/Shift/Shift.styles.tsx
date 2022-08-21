import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    fab: {
      position: "absolute",
      bottom: 40,
      right: 40,
      backgroundColor: 'white',
      color: theme.color.turquoise
    },
}));