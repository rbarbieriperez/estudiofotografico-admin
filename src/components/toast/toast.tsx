import { useGlobal } from "../../hooks/useGlobal";
import { Alert } from 'antd';

const Toast = () => {
    const { toast, closeToast } = useGlobal();

    if (!toast) return null;

    return (
        <div className="absolute bottom-0 left-0 w-full z-100">
            <Alert message={toast.message} type={toast.variant} showIcon closable afterClose={closeToast}/>
        </div>
    )
};

export default Toast;