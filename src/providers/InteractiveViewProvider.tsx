import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TProps = {
  children: React.ReactNode;
};

const InteractiveViewProvider = ({ children }: TProps) => {
  return (
    <>
      {children}
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={true}
      />
    </>
  );
};

export default InteractiveViewProvider;
