import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";

const profile = () => {
    document.title = `${process.env.REACT_APP_NAME} | Profile `

    return(
      <MotionDiv>
        This is a profile
      </MotionDiv>
    );
}

export default profile;
