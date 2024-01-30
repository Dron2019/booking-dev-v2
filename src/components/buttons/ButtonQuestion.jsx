import React from "react"
import PropTypes from "prop-types"
export default function ButtonQuestion({ onClick = () => {}, type = ''}){
    return (
        <button className={["ob_button_question", `ob_button_question--${type}`].join(' ')} onClick={onClick}>
            ?
        </button>
    )
}
ButtonQuestion.propTypes = {
    onClick: PropTypes.func
}
