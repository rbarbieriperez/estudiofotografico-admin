import React from "react";
import { TEventRaw, TFile, TImage } from "../../types/types";
import CountriesSelect from "../countries-select/countries-select";
import DepartmentsSelect from "../departments-select/departments-select";

import type { FormInstance } from "antd";
import { Form, Button, Input, DatePicker, Alert } from "antd";
import TextArea from "antd/es/input/TextArea";
import CategoryGroupsSelect from "../category-groups-select/category-groups-select";
import CategoriesSelect from "../categories-select/categories-select";
import CitiesSelect from "../cities-select/citites-select";
import UploadImages from "../upload-images/upload-images";
import EventPasswordForm from "../event-password-form/event-password-form";
import dayjs from "dayjs";
import { InfoCircleOutlined } from "@ant-design/icons";
import ImagesZipPreview from "../images-zip-preview/images-zip-preview";
import { useGlobal } from "../../hooks/useGlobal";

type TFieldType = {
    country: string;
    department: string;
    city: string;
    name: string;
    date: string;
    description: string;
    event_category_id: number;
    event_category_group_id: number;
    credentials?: { user: string; password: string };
    images?: TImage[]
};

interface IEventDataForm {
    event: TEventRaw;
    eventType: "public" | "private";
    onChange: (event: TEventRaw) => void;
    formType: "create" | "update" | "delete";
    formInstance: FormInstance<any>;
    fileData?: TFile;
}

const EventDataForm = ({
    event,
    eventType,
    onChange,
    formType,
    formInstance,
    fileData
}: IEventDataForm) => {
    const { taskInProgress } = useGlobal();
    

    return (
        <>
            <Form.Item<TFieldType>
                name="country"
                initialValue={event.country}
                rules={[
                    { required: true, message: "El campo país es requerido." },
                ]}
            >
                <CountriesSelect
                    value={event.country}
                    onChange={(e) => onChange({ ...event, country: e, department: "" })}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="department"
                initialValue={event.department || null}
                rules={[
                    {
                        required: true,
                        message: "El campo departamento es requerido.",
                    },
                ]}
            >
                <DepartmentsSelect
                    disabled={!event.country}
                    countryId={event.country}
                    value={event.department || ''}
                    onChange={(e) => {
                        onChange({ ...event, department: e, city: '' });
                        formInstance.setFieldsValue({ city: null })
                    }}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="city"
                initialValue={event.city || null}
                rules={[
                    {
                        required: true,
                        message: "El campo ciudad es requerido.",
                    },
                ]}
            >
                <CitiesSelect
                    countryId={event.country}
                    departmentId={event.department}
                    value={event.city || ''}
                    onChange={(e) => onChange({ ...event, city: e })}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="name"
                initialValue={event.name || null}
                rules={[
                    {
                        required: true,
                        message: "El campo nombre es requerido.",
                    },
                ]}
            >
                <Input
                    type="text"
                    value={event.name}
                    placeholder="Nombre*"
                    onChange={(e) => {
                        onChange({
                            ...event,
                            name: e.target.value,
                        });
                    }}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="date"
                initialValue={event.date ? dayjs(event.date) : null}
                rules={[
                    { required: true, message: "El campo fecha es requerido." },
                ]}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    value={event.date ? dayjs(event.date) : null}
                    format={"DD/MM/YYYY"}
                    onChange={(e) => {
                        onChange({
                            ...event,
                            date: e ? e.toDate().toISOString() : '',
                        });
                    }}
                    placeholder="Fecha*"
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="event_category_group_id"
                rules={[
                    {
                        required: true,
                        message: "El campo categoría es requerido.",
                    },
                ]}
                initialValue={event.event_category_group_id || null}
            >
                <CategoryGroupsSelect
                    value={event.event_category_group_id.toString()}
                    onChange={(value) =>
                        onChange({ ...event, event_category_group_id: Number(value) })
                    }
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="event_category_id"
                rules={[
                    {
                        required: true,
                        message: "El campo tipo de evento es requerido.",
                    },
                ]}
                initialValue={event.event_category_id || null}
            >
                <CategoriesSelect
                    value={event.event_category_id.toString() || ""}
                    disabled={!event.event_category_group_id}
                    categoryGroupId={event.event_category_group_id.toString()}
                    onChange={(value) =>
                        onChange({ ...event, event_category_id: Number(value) })
                    }
                />
            </Form.Item>

            {
                eventType === "private" && (
                    <Form.Item<TFieldType>
                        name="credentials"
                        rules={[
                            {
                                required: true,
                                message: "El campo credenciales es requerido.",
                            },
                        ]}
                        initialValue={ event.event_user && event.event_password
                            ? { user: event.event_user, password: event.event_password }
                            : null }
                    >
                        <EventPasswordForm
                            value={{ user: event.event_user, password: event.event_password }}
                            onChange={({ user, password }) => {
                                onChange({ ...event, event_user: user, event_password: password });
                            }}
                        />
                    </Form.Item>
                )
            }

            <Form.Item<TFieldType>
                name="description"
                rules={[
                    {
                        required: true,
                        message: "El campo descripción es requerido.",
                    },
                ]}
                initialValue={event.description || null}
            >
                <TextArea
                    rows={4}
                    cols={4}
                    maxLength={200}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    value={event.description}
                    placeholder="Descripción*"
                    onChange={(e) => {
                        onChange({
                            ...event,
                            description: e.target.value,
                        });
                    }}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="images"
                rules={[
                    {
                        required: eventType === 'private' && formType === 'update' ? false : true,
                        message: "El campo imagenes es requerido.",
                    }
                ]}
                initialValue={event.images || []}
            >
                <UploadImages eventType={eventType} onChange={(images) => onChange({ ...event, images: images })} value={event.images || []} />
            </Form.Item>

            {eventType === 'private' && formType === 'create' && <Alert
                message="Información importante"
                description="Guardamos las imágenes en formato zip para ahorrar espacio de almacenamiento."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{ marginTop: 10 }}
                closable
            />}

            {eventType === 'private' && formType === 'update' && !!event.images.length && <Alert
                message="Información importante"
                description={<div className="flex flex-col gap-y-2">
                    <p>Cargar nuevas imágenes sobreescribe las anteriores.</p>
                    <p>Si no se seleccionan nuevas imágenes se conservan las que ya estaban.</p>
                    <p>Proceda con precaución.</p>
                </div>}
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{ marginTop: 10 }}
                closable
            />}

            { eventType === 'private' && formType === 'update' && fileData && <ImagesZipPreview fileName={fileData?.name || ''} size={fileData?.size || '0'} totalImages={fileData?.totalImages || '0'} downloadLink={fileData?.webContentLink || ''} key={Math.random()}/>}

            {formType === "create" && (
                <Form.Item style={{ textAlign: "center", marginTop: "3rem" }}>
                    <Button disabled={!!taskInProgress} type="primary" htmlType="submit">
                        Crear evento
                    </Button>
                </Form.Item>
            )}

            {formType === "update" && (
                <Form.Item style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button disabled={!formInstance.isFieldsTouched() || !!taskInProgress} type="primary" htmlType="submit">
                        Actualizar evento
                    </Button>
                </Form.Item>
            )}
        </>
    );
};

export default EventDataForm;
