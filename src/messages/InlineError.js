import React from 'react'
import PropTypes from 'prop-types'

// rsc
const InlineError = ({ text }) => {
    return <div style={{ color: 'red' }}>{text}</div>
}

InlineError.propTypes = {
    text: PropTypes.string.isRequired,
}

export default InlineError
