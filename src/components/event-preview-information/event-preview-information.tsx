import dayjs from "dayjs";
import { TEvent, TImage } from "../../types/types";
import UploadImages from "../upload-images/upload-images";

interface IEventPreviewInformation {
    event: TEvent;
    images: TImage[];
}

const EventPreviewInformation = ({ event, images }: IEventPreviewInformation) => {
  return <div className="flex flex-col gap-y-2">
      <p className="text-center font-poppinsBold!">Datos del evento</p>
      <p>Nombre: {event.name}</p>
      <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
      <p>Lugar: {event.city}, {event.department}, {event.country}</p>
      <p>Descripción: {event.description}</p>
      <p>Creado hace: {event.numberOfDaysSinceCreation} dias - {dayjs(event.creation_date).format("DD/MM/YYYY")}</p>
      <p>Tipo de evento: {event.event_type_id === 1 ? "Publico" : "Privado"}</p>
      { event.event_user && <p>Usuario: {event.event_user}</p> }
      { event.event_password && <p>Contraseña: {event.event_password}</p> }
      <p>Imagenes: {event.total_images}</p>

      <div>
          <p className="text-center font-poppinsBold!">Imagenes</p>
          <UploadImages formType="delete" value={images} onChange={() => {}} eventType={'public'} />
      </div>
  </div>
};

export default EventPreviewInformation;