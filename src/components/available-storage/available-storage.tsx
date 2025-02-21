
import { Progress } from 'antd';
import { useGlobal } from '../../hooks/useGlobal';
import { Skeleton } from 'antd';
import React from 'react';

const AvailableStorage = () => {
    const { driveData, loginData } = useGlobal();

    const [percent, setPercent] = React.useState(0);

    React.useEffect(() => {
        if (!driveData) return;
        setPercent(((driveData.limit - driveData.availableSpace) / driveData.limit) * 100);
    }, [driveData]);

    return (
        !driveData ? <Skeleton active /> :
        <div className='flex flex-row flex-wrap justify-between'>
            <span className='font-poppinsBold text-sm basis-full'>Almacenamiento en Drive</span>
            <span className='font-poppinsLight text-xs basis-full'>Cuenta: {loginData?.email}</span>
            <Progress status={percent > 80 ? 'exception' : 'normal'} percent={Number(percent.toFixed(2))} />
            <span className='font-poppinsLight text-xs'>Usado: {driveData?.usage.toFixed(2)} GB</span>
            <span className='font-poppinsLight text-xs'>Disponible: {driveData?.availableSpace.toFixed(2)} GB</span>
            <span className='font-poppinsLight text-xs'>Limite: {driveData?.limit.toFixed(2)} GB</span>
            {percent > 80 && percent < 100 && <span className='font-poppinsLight mt-2 basis-full text-xs text-red-500'>Tu almacenamiento esta por llenarse, considera eliminar eventos para liberar espacio.</span>}
            {percent === 100 && <span className='font-poppinsLight mt-2 basis-full text-xs text-red-500'>Tu almacenamiento esta lleno, elimina eventos para liberar espacio.</span>}
        </div>
    );
}

export default AvailableStorage;