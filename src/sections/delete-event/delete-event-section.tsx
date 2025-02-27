import { Button, Form, Popconfirm, Skeleton } from "antd";
import EventSelect from "../../components/events-select/events-select";
import { useGlobal } from "../../hooks/useGlobal";
import { TEvent, TImage } from "../../types/types";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import useService from "../../hooks/useService";
import EventPreviewInformation from "../../components/event-preview-information/event-preview-information";
import ReturnArrow from "../../components/return-arrow/return-arrow";

interface IDeleteEventSection {
  eventType: 'public' | 'private';
  shouldClose: () => void;
  eventToBeDeleted?: TEvent;
}

type TFieldType = {
    event: string
};

const DeleteEventSection = ({ eventType, shouldClose, eventToBeDeleted }: IDeleteEventSection) => {
  const {events, showToast, setLoading} = useGlobal();
  const { data, fetchData } = useService();

  const [event, setEvent] = React.useState<TEvent | null>(null);
  const [images, setImages] = React.useState<TImage[]>([]);
  
  const [_eventToBeDeleted, setEventToBeDeleted] = React.useState<TEvent | null>(eventToBeDeleted || null);

  const [form] = Form.useForm();

  const onEventSelected = (event: TEvent) => {
    try {
        if (!event.event_id) return;
        setLoading(true);
        setEvent(event);
        fetchData({
            api: `events/${event.event_id}/images`,
            method: 'GET',
        });
    } catch (error) {
      console.log('error getting images');
    }
  };

  React.useEffect(() => {
    if (_eventToBeDeleted) {
        onEventSelected(_eventToBeDeleted);
    }
  }, [_eventToBeDeleted]);

  const openErrorToast = (message: string) => {
    setLoading(false);
    showToast({
        variant: 'error',
        message,
    });
};

  const handleSubmit = () => {
    try {
        if (!event || !event.event_id) return;
        setLoading(true);
        setEventToBeDeleted(null);
        fetchData({
            api: `events/${event?.event_id}`,
            method: 'DELETE',
        });
    } catch (error) {
        openErrorToast('Ha ocurrido un error al eliminar el evento.');
    }
  }

  React.useEffect(() => {
    if (data?.code === 200 && data?.data && event && images.length && !_eventToBeDeleted) {
        setLoading(false);
        showToast({ variant: 'success', message: 'Evento eliminado con exito.' });
        form.resetFields();
        setEvent(null);
        shouldClose();
    }

    if (data?.code === 200 && data?.data && !images.length && event) {
        setLoading(false);
        setImages(data?.data as TImage[]);
    }

    if ([500, 400].includes(data?.code || 0)) {
        openErrorToast('Ha ocurrido un error al eliminar el evento.');
    }

  }, [data]);

  return <section className="p-10 flex flex-col gap-y-4 md:w-3/4 md:mx-auto">
    <ReturnArrow onClick={shouldClose}/>
    <h1 className="text-xl font-normal text-center">Eliminar evento {eventType === 'public' ? 'público' : 'privado' }</h1>
    <Form onFinish={handleSubmit} form={form}>
      <FormItem<TFieldType>
      name="event"
      initialValue={event?.event_id || null || eventToBeDeleted?.event_id}
      valuePropName="event"
      rules={[
          { required: true, message: "Debes seleccionar un evento," },
      ]}>
        <EventSelect disabled={!!eventToBeDeleted} value={(event?.event_id || '').toString()} eventType={eventType} events={events || []} onChange={onEventSelected}/>
      </FormItem>

      { !event || !images.length && <Skeleton active/>}

      <Form.Item>
         { event && !!images.length && <EventPreviewInformation images={images} event={event}/> }
      </Form.Item>

      <FormItem style={{ textAlign: "center", marginTop: "1rem" }}>
        { event && !!images.length && <Popconfirm onConfirm={() => form.submit()} title="Estas seguro de eliminar el evento?" description="Esta acción no se puede revertir.">
         <Button style={{ backgroundColor: "red", color: 'white' }} type="primary" disabled={!event}>Eliminar</Button>
        </Popconfirm>}
      </FormItem>


    </Form>
  </section>;
};

export default DeleteEventSection;