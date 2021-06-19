import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import classes from "./Profile.css";

const profile = () => {
    document.title = `${process.env.REACT_APP_NAME} | Profile `

    return(
      <MotionDiv className={classes.Container}>
        This is a profile
      </MotionDiv>
    );
}

export default profile;
