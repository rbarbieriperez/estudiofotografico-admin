
import { CloseOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import React from "react";
import { useGlobal } from "../../hooks/useGlobal";


type TStatus = {
  name: string,
  progressPercent: number,
  stepMessage: string,
  status: string;
};

const EventUploadProgressStatus = () => {
  const [status, setStatus] = React.useState<TStatus>();
  const {setTaskInProgress} = useGlobal();


  React.useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    socket.onmessage = (event) => {
      console.log('socket message', event);
      setStatus(JSON.parse(event.data) as TStatus);
    }
  }, []);


  const getStatus = (status: string) => {
    switch (status) {
      case 'failed':
        return 'exception';
      case 'completed':
        return 'success';
      default:
        return 'normal';
    }
  };

  const handleCloseStatus = () => {
    setStatus(undefined);
  }

  React.useEffect(() => {
    console.log('status', !['completed', 'failed'].includes(status?.status || ''));
    setTaskInProgress(!['completed', 'failed'].includes(status?.status || 'completed'));
  }, [status]);

  return <>
    {!status && null}
    { status && <div className="text-sm">
      <hr className="border-b-[1px] border-gray-200"/>
      <div className="mt-3 flex justify-between items-center">
        <p>Subida de evento en progreso</p>
        <CloseOutlined onClick={handleCloseStatus} />
      </div>
      <Progress style={{ marginTop: 5}} status={getStatus(status.status)} percent={Number(status.progressPercent.toFixed(2))}/>
      <p className="text-xs">Evento: {status.name}</p>
      <p className="text-xs">Estado: {status.stepMessage}</p>
    </div>}
  </>;
};

export default EventUploadProgressStatus;