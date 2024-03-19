import { useNavigation } from "react-router-dom";
import propTypes from 'prop-types';

const SubmitBtn = ({formBtn}) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      type='submit'
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting...' : 'submit'}
    </button>
  );
}
SubmitBtn.propTypes = {
    formBtn: propTypes.bool
}
export default SubmitBtn