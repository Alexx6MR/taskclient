import toast from 'react-hot-toast';

const SuccessAlert = (message) => toast.success(`${message}`);
const ErrorAlert = (message) => toast.success(`${message}`);

const Notify = {SuccessAlert, ErrorAlert}

export default Notify