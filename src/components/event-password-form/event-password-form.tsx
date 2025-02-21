import { InfoCircleOutlined, RedoOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import React from "react";

interface IEventPasswordForm {
  onChange: ({ user, password }: { user: string; password: string }) => void;
  value: { user: string; password: string };
}

const EventPasswordForm = ({
  onChange,
  value
}: IEventPasswordForm) => {

  const generateRandomCredentials = () => {
    const randomUser = Math.random().toString(36).substring(8);
    const randomPassword = Math.random().toString(36).substring(8);

    onChange({ user: randomUser, password: randomPassword });
  }

  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return <>
    <div className="flex gap-x-2 items-center">
      <p>Credenciales del evento</p>
      <Tooltip title="Estas credenciales serán utilizadas por los usuarios para acceder al evento y descargar las imágenes.">
          <InfoCircleOutlined />
      </Tooltip>
    </div>
    <Input
      style={{ marginTop: 10 }}
      value={value?.user || ''}
      minLength={8}
      maxLength={20}
      placeholder="Usuario"
      onChange={(e) => onChange({ user: e.target.value, password: value?.password || '' })}
    />
    <Input.Password
      style={{ marginTop: 10 }}
      minLength={8}
      maxLength={20}
      placeholder="Contraseña"
      type="password"
      value={value?.password || ''}
      onChange={(e) => onChange({ user: value?.user || '', password: e.target.value })}
    />

    <div className="w-full flex justify-end mt-2 pr-2">
      <RedoOutlined aria-roledescription="button" onClick={generateRandomCredentials}/>
    </div>

  </>;
};

export default EventPasswordForm;