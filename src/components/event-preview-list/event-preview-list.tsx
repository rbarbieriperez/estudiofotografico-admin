import { Select } from "antd";
import { TEvent } from "../../types/types";
import EventPreviewCard from "../event-preview-card/event-preview-card";

interface IEventPreviewList {
    filterSelected: string;
    events: TEvent[];
    onSelectedFilter: (event: string) => void;
    onDelete: (event: TEvent) => void;
    onUpdate: (event: TEvent) => void;
}

const orderOptions = [
    {
        value: "creation-date-asc",
        label: <span>Fecha creación - Ascendente</span>,
    },
    {
        value: "creation-date-desc",
        label: <span>Fecha creación - Descendente</span>,
    },
    {
        value: "number-of-images-asc",
        label: <span>Número de imágenes - Ascendente</span>,
    },
    {
        value: "number-of-images-desc",
        label: <span>Número de imágenes - Descendente</span>,
    },
    {
        value: "solds-asc",
        label: <span>Número de ventas - Ascendente</span>,
    },
    {
        value: "solds-desc",
        label: <span>Número de ventas - Descendente</span>,
    },
];

const EventPreviewList = ({
    filterSelected,
    events,
    onSelectedFilter,
    onDelete,
    onUpdate
}: IEventPreviewList) => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <Select
                options={orderOptions}
                defaultValue={filterSelected ? filterSelected : orderOptions[1].value}
                onChange={onSelectedFilter}
                disabled={!events.length}
            />
            {
                !!events.length &&
                events.map((event, index) => (
                    <EventPreviewCard onDelete={onDelete} onUpdate={onUpdate} key={index} event={event} />
                ))
            }

            {
                !events.length &&
                <p className="text-center">No hay eventos</p>
            }
        </div>
    );
};

export default EventPreviewList;
