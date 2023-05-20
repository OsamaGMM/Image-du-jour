import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ showToast }) => {

  // Monter le toast
  useEffect(() => {
    if (showToast) {
        toast.warn("Connectez vous pour aimer l'image", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            });
    }
  }, [showToast]);

  return null; //rien
};

export default Toast;
