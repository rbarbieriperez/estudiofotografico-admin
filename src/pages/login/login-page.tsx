import React, { use } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import useService from "../../hooks/useService";
import { useGlobal } from "../../hooks/useGlobal";
import { TUserLoginData } from "../../types/types";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

type TData = {
    code: number;
    data: {
        jwt: string;
        data: TUserLoginData
    };
};

interface ILoginPage {
    onLogin: () => void;
}


const LoginPage = ({ onLogin }:ILoginPage) => {
    const { data, fetchData } = useService();
    const { setLoading, showToast, setLoginData } = useGlobal();

    const [requesting, setRequesting] = React.useState<boolean>(false);


    const onSubmit:FormProps<FieldType>['onFinish'] = async (event) => {

        
        if (event?.username && event?.password) {
            setRequesting(true);
            setLoading(true);
            await fetchData({
                api: 'login',
                method: 'POST', 
                body: {
                    username: event.username,
                    password: event.password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        }
    };

    const onError = () => {};

    React.useEffect(() => {
        if (!requesting) return;

        const _data = data as TData;
        console.log(_data);
        if (_data?.code === 200 && _data?.data?.jwt) {
            setRequesting(false);
            setLoading(false);
            sessionStorage.setItem('jwt', _data?.data?.jwt);
            setLoginData(_data.data.data as TUserLoginData);
            onLogin();
        } else {
            console.log('voy por else');
            setRequesting(false);
            setLoading(false);
            showToast({
                variant: 'error',
                message: 'Usuario o contraseña incorrectos'
            })
        }
    }, [data]);

    return (
        <main className="flex flex-row w-full h-full fixed">
            <div className="w-[80%] m-auto shadow-2xl rounded-xl p-10 justift-self-center sm:w-[50%] max-w-[400px]">
                <Form
                    name="Login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    onFinishFailed={onError}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Usuario"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message:
                                    "El campo usuario no puede estar vacío.",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Contraseña"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message:
                                    "El campo contraseña no puede estar vacío.",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        label={null}
                    >
                        <Checkbox>Recordarme</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Acceder
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
};

export default LoginPage;
