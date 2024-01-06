import PropTypes from 'prop-types';
import Alert from './Alert';

function CloseableAlert({
  children, onClose, visible, type,
}) {
  return (
    <Alert visible={visible} type={type}>
      <div>
        <button type="button" onClick={onClose} title="Close">X</button>
      </div>
      <div>
        {children}
      </div>
    </Alert>
  );
}

CloseableAlert.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default CloseableAlert;
