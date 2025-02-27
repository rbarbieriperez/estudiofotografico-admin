import React from "react";
import EventSelect from "../../components/events-select/events-select";
import { useGlobal } from "../../hooks/useGlobal";
import { TEvent, TEventRaw, TFile, TImage } from "../../types/types";
import EventDataForm from "../../components/event-data-form/event-data-form";
import { Form, Skeleton } from "antd";
import useService from "../../hooks/useService";
import ReturnArrow from "../../components/return-arrow/return-arrow";

interface IUpdateSection {
    eventType: 'public' | 'private';
    shouldClose: () => void;
    eventToBeUpdated?: TEvent;
}

const UpdateEventSection = ({
    eventType,
    shouldClose,
    eventToBeUpdated
}: IUpdateSection) => {
    const { events, showToast, setLoading } = useGlobal();
    const [event, setEvent] = React.useState<TEventRaw | null>(null);
    const [eventEdited, setEventEdited] = React.useState<Boolean>(false);
    const { data, fetchData } = useService();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [fileData, setFileData] = React.useState<TFile>();
    const [form] = Form.useForm();

    const [_eventToBeUpdated, setEventToBeUpdated] = React.useState<TEvent | null>(eventToBeUpdated || null);

    React.useEffect(() => {
        if (_eventToBeUpdated) {
            onEventSelected(_eventToBeUpdated);
        }
    }, [_eventToBeUpdated]);

    const openErrorToast = (message: string) => {
        setLoading(true);
        showToast({
            variant: 'error',
            message,
        });
    };

    const onEventSelected = async (event: TEvent) => {
        setIsLoading(true);
        setEvent({
            ...event,
            images: []
        });

        await handleGetImages(event.event_id);
    }

    const buildFormData = (eventData: TEventRaw) => {
            const formData = new FormData();
            formData.append('event', JSON.stringify(eventData));
            for (const image of eventData.images) {
                formData.append('images', image.file);
            }
            return formData;
        }

    const handleGetImages = async (eventId: number) => {
        try {
            setLoading(true);
            await fetchData({
                api: `events/${eventId}/images`,
                method: 'GET',
                params: {
                    ...(eventType === 'public' ? {} : {'event-type': 'private'})
                }
            });
        } catch (error) {
            openErrorToast('Ha ocurrido un error al obtener las imágenes.');
            resetForm();
        }
    }

    React.useEffect(() => {
        if (data?.code === 200 && event) {
            setIsLoading(false);
            setLoading(false);

            if (eventType === 'public') {
                setEvent({
                    ...event,
                    images: data.data as TImage[]
                });
            } else {
                setFileData(data.data as TFile);
            }
        }

        if ([500, 400] .includes(data?.code || 0) && event) {
            openErrorToast('Ha ocurrido un error al modificar el evento.');
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            if (!event) return;
            setLoading(true);
            setEventToBeUpdated(null);
            const formData = buildFormData(event);

            await fetchData({
                api: `events/${event.event_id}`,
                method: 'PATCH',
                body: formData
            });

            setEvent(null);
        } catch (error) {
            openErrorToast('Ha ocurrido un error al modificar el evento.');
        }
    }

    React.useEffect(() => {
        if (data?.code === 200 && !event) {
            setLoading(false);
            showToast({ variant: 'success', message: 'Evento modificado con exito.' });
            resetForm();
            shouldClose();
        }

        if ([500, 400] .includes(data?.code || 0) && !event) {
            openErrorToast('Ha ocurrido un error al modificar el evento.');
        }
    }, [data]);

    const resetForm = () => {
        form.resetFields();
        setEvent(null);
    }



    return <section className="p-10 flex flex-col gap-y-4 md:w-3/4 md:mx-auto">
        <ReturnArrow onClick={shouldClose}/>
        <h1 className="text-xl font-normal">Modificar evento {eventType === 'public' ? 'público' : 'privado' }</h1>
        <EventSelect disabled={!!eventToBeUpdated} value={(event?.event_id || '').toString()} eventType={eventType} events={events || []} onChange={onEventSelected}/>

        {!event && isLoading && <Skeleton active/>}

        {event && (!!event.images.length || eventType === 'private' || eventEdited) && <Form onFinish={handleSubmit} form={form} className="w-full gap-y-4" name="event-data-form" autoComplete="off">
            <EventDataForm fileData={fileData} formType="update" formInstance={form} event={event} eventType={eventType} onChange={(event) =>{
                setEventEdited(true);
                setEvent(event);
            }}/>
        </Form>}

    </section>;
};

export default UpdateEventSection;