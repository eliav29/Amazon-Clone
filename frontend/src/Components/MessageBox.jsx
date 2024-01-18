import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

const MessageBox = ({variant, childern}) => {
  return (
    <Alert variant={variant || 'info'}>{childern}</Alert>
  )
}

MessageBox.propTypes = {
    variant: PropTypes.string, childern: PropTypes.node
};

export default MessageBox