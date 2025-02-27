import noImage from '../../images/event-mock-image.png';
import { TEvent } from "../../types/types";
import Icon, { DeleteOutlined, EditOutlined } from '@ant-design/icons';



interface IEventPreviewCard {
    event: TEvent,
    onDelete: (event: TEvent) => void;
    onUpdate: (event: TEvent) => void;
}

const EventPreviewCard = ({ event, onDelete, onUpdate }: IEventPreviewCard) => {
    return <div className="w-full flex flex-col p-6 gap-y-1 shadow-lg rounded-lg lg:w-[15rem]">
        <img className=' m-auto' referrerPolicy='no-referrer' src={event.eventPreviewImage ? event.eventPreviewImage : noImage} alt="" />
        <span className='font-poppinsLight text-sm'>Evento: {event.name}</span>
        <span className='font-poppinsLight text-sm'>Fecha: {new Date(event.date).toLocaleDateString()}</span>
        <span className='font-poppinsLight text-sm'>Lugar: {event.city}, {event.department}, {event.country}</span>
        <span className='font-poppinsLight text-sm'>Creado hace: {event.numberOfDaysSinceCreation} días</span>
        <span className='font-poppinsLight text-sm'>Imagenes: {event.total_images}</span>

        <div className='w-full flex gap-x-4 mt-3'>
            <Icon className='cursor-pointer p-2 bg-blue-400 rounded-full' onClick={() => onUpdate(event)} component={EditOutlined}/>
            <Icon className='cursor-pointer p-2 bg-red-400 rounded-full' onClick={() => onDelete(event)} component={DeleteOutlined}/>
        </div>
    </div>
}

export default EventPreviewCard;