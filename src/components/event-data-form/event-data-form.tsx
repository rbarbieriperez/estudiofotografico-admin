import React from "react";
import { TEventRaw, TImage } from "../../types/types";
import CountriesSelect from "../countries-select/countries-select";
import DepartmentsSelect from "../departments-select/departments-select";

import type { FormProps } from "antd";
import { Form, Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import CategoryGroupsSelect from "../category-groups-select/category-groups-select";
import CategoriesSelect from "../categories-select/categories-select";
import CitiesSelect from "../cities-select/citites-select";
import UploadImages from "../upload-images/upload-images";

type TFieldType = {
    country: string;
    department: string;
    city: string;
    name: string;
    date: string;
    description: string;
    event_type_id: number;
    event_category_id: number;
    images: TImage[]
};

interface IEventDataForm {
    event: TEventRaw;
    eventType: "public" | "private";
    onChange: (event: TEventRaw) => void;
    formType: "create" | "update" | "delete";
}

type TSelectOption = {
    value: string;
    label: string;
};

type TCountry = { tags: { [key: string]: string }; id: number };

type TParsedLocation = {
    name: string;
    id: number;
};

const EventDataForm = ({
    event,
    eventType,
    onChange,
    formType,
}: IEventDataForm) => {

    const [form] = Form.useForm();

    return (
        <Form form={form} className="w-full gap-y-4" name="event-data-form" autoComplete="off">
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
                    value={event.department}
                    onChange={(e) => {
                        onChange({ ...event, department: e, city: '' });
                        form.setFieldsValue({ city: '' });
                    }}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="city"
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
                    value={event.city}
                    onChange={(e) => onChange({ ...event, city: e })}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="name"
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
                rules={[
                    { required: true, message: "El campo fecha es requerido." },
                ]}
            >
                <Input
                    type="date"
                    value={event.date}
                    placeholder="Fecha*"
                    onChange={(e) => {
                        onChange({
                            ...event,
                            date: e.target.value,
                        });
                    }}
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="event_category_id"
                rules={[
                    {
                        required: true,
                        message: "El campo categoría es requerido.",
                    },
                ]}
                initialValue={event.event_category_id || ""}
            >
                <CategoryGroupsSelect
                    onChange={(value) =>
                        onChange({ ...event, event_category_id: Number(value) })
                    }
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="event_type_id"
                rules={[
                    {
                        required: true,
                        message: "El campo tipo de evento es requerido.",
                    },
                ]}
                initialValue={event.event_type_id || ""}
            >
                <CategoriesSelect
                    disabled={!event.event_category_id}
                    categoryGroupId={event.event_category_id.toString()}
                    onChange={(value) =>
                        onChange({ ...event, event_type_id: Number(value) })
                    }
                />
            </Form.Item>

            <Form.Item<TFieldType>
                name="description"
                rules={[
                    {
                        required: true,
                        message: "El campo descripción es requerido.",
                    },
                ]}
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
                        required: true,
                        message: "El campo imagenes es requerido.",
                    },
                ]}
            >
                <UploadImages onChange={(images) => onChange({ ...event, images: images })} images={event.images} />
            </Form.Item>

            {formType === "create" && (
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Crear evento
                    </Button>
                </Form.Item>
            )}
        </Form>
    );
};

export default EventDataForm;
