import React from "react";
import { TEventRaw } from "../../types/types";
import EventDataForm from "../../components/event-data-form/event-data-form";
import { Form } from "antd";
import useService from "../../hooks/useService";
import ReturnArrow from "../../components/return-arrow/return-arrow";
import { useGlobal } from "../../hooks/useGlobal";
interface IAddProductSection {
    eventType: "public" | "private";
    shouldClose: () => void;
}

const initialFormData: TEventRaw = {
    name: "",
    date: "",
    country: "Uruguay",
    department: "",
    city: "",
    description: "",
    event_user: "",
    event_password: "",
    event_type_id: 0,
    event_category_id: 0,
    event_category_group_id: 0,
    images: [],
}


const AddEventSection = ({ eventType, shouldClose }: IAddProductSection) => {
    const [eventData, setEventData] = React.useState<TEventRaw>(initialFormData);
    const { data, fetchData } = useService();
    const { showToast, setLoading } = useGlobal();

    const [form] = Form.useForm();

    const openErrorToast = (message: string) => {
        setLoading(false);
        showToast({
            variant: 'error',
            message,
        });
    };

    const buildFormData = (eventData: TEventRaw) => {
        const formData = new FormData();
        formData.append('event', JSON.stringify({...eventData, event_type_id: eventType === "public" ? 1 : 2}));
        for (const image of eventData.images) {
            formData.append('images', image.file);
        }

        return formData;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            if (!eventData) return;
            setLoading(true);
            const formData = buildFormData(eventData);

            console.log(formData.entries());

            await fetchData({
                api: "events",
                method: "POST",
                body: formData,
            });
        } catch (error) {
            openErrorToast('Ha ocurrido un error al crear el evento.');
        }
    };

    React.useEffect(() => {
        if (data?.code === 200) {
            setLoading(false);
            showToast({ variant: 'success', message: 'Evento creado con exito.' });
            setEventData(initialFormData);
            form.resetFields();
            shouldClose();
        } 

        if ([400, 500].includes(data?.code || 0) ) {
            openErrorToast('Ha ocurrido un error al crear el evento.');
        }
    }, [data]);

    return (
        <section className="p-10 flex flex-col gap-y-4">
            <ReturnArrow onClick={shouldClose}/>
            <h1 className="text-xl font-normal">Crear evento {eventType === 'public' ? 'público' : 'privado' }</h1>
            <Form onFinish={handleSubmit} form={form} className="w-full gap-y-4" name="event-data-form" autoComplete="off">
                <EventDataForm formInstance={form} formType="create" event={eventData} eventType={eventType} onChange={setEventData}/>
            </Form>
        </section>
    );
};

export default AddEventSection;
