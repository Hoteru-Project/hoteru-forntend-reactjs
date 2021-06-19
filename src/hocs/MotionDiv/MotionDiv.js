import React from "react";
import {motion} from "framer-motion";

const motionState = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
}

const MotionDiv = (props) => <motion.div {...motionState} {...props}>{props.children}</motion.div>

export default MotionDiv;
