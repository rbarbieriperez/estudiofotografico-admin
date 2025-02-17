import { useGlobal } from "../../hooks/useGlobal";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const Spinner = () => {
    const { loading } = useGlobal();

    if (!loading) return null;
    
    return <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 z-1000">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50"></div>
    </div>
};

export default Spinner;