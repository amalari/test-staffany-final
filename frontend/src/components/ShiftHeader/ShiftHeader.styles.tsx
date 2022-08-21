import { makeStyles } from "@material-ui/core/styles";

const btnColor = "#50D9CE"
export const useStyles = makeStyles((theme) => ({
    container: {
        padding: "10px 0px"
    },
    textPublishedColor: {
        color: btnColor
    },
    textPublishedAt: {
        color: btnColor,
        marginRight: "10px",
    },
    iconPublishedAt: {
        fontSize: "16px",
        verticalAlign: "middle"
    },
    btnAddShift: {
        color: btnColor,
        borderColor: btnColor,
        marginRight: '10px'
    },
    btnPublish: {
        backgroundColor: btnColor,
        borderColor: btnColor,
        '&:hover': {
            backgroundColor: btnColor,
        }
    },
  }));
  