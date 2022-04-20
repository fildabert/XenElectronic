import Swal from 'sweetalert2';

export default function errorHandler(error, overrideMessage) {
  let errorMessage = overrideMessage || 'Something went wrong';
  if (!overrideMessage && error.response) {
    errorMessage = error.response.data.message;
  }
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: errorMessage,
  });
}
