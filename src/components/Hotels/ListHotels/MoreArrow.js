import React from "react";
import {motion} from "framer-motion";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const MoreArrow = (props) => {
    const animation = {
        rotate: props.animate?.rotate??0
    }

    return (
        <motion.div  animate={animation}>
            <ExpandMoreRoundedIcon  {...props}/>
        </motion.div>
    )
}

export default MoreArrow;