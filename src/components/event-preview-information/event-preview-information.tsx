import dayjs from "dayjs";
import { TEvent, TEventRaw, TImage } from "../../types/types";
import UploadImagePreview from "../upload-image-preview/upload-image-preview";

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
          { images.map((image, index) => <div className="flex mt-4" key={`image-${index}`}>
              <UploadImagePreview eventType={"public"} mode="view" image={image} onDelete={() => {}} onUpdate={() => {}} selectPrevisualizeEnabled={false}/>
          </div>) }
      </div>
  </div>
};

export default EventPreviewInformation;