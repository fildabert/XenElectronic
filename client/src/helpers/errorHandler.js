import Swal from 'sweetalert2';

export default function errorHandler(error) {
  let errorMessage = 'Something went wrong';
  if (error.response) {
    errorMessage = error.response.data.message;
  }
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: errorMessage,
  });
}
