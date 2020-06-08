import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const ModalAlert = (title, message, icon) => {
    return MySwal.fire({
        title,
        text: message,
        icon,
        backdrop: '25BE6B',
        confirmButtonText: 'Ok'

    })
}

export const ModalConfirm = (title, message, icon, handleFunction) => {
    return MySwal.fire({
        title,
        text: message,
        icon,
        backdrop: '25BE6B',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.value) {
            handleFunction()
        }
      })
}
