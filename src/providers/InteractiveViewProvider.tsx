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
        position="bottom-center"
        autoClose={3000}
        closeOnClick={true}
        hideProgressBar
        toastStyle={{
          background: '#666',
          borderRadius: '8px',
          padding: '0 12px',
          fontFamily: 'font-HappinessR',
          fontSize: '14px',
          color: '#fff',
          minHeight: '48px',
        }}
        style={{ bottom: '20px', padding: '0 20px' }}
      />
    </>
  );
};

export default InteractiveViewProvider;
