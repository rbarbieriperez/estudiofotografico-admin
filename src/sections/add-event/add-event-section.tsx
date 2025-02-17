import React from "react";
import { TEventRaw } from "../../types/types";
import EventDataForm from "../../components/event-data-form/event-data-form";

interface IAddProductSection {
    eventType: "public" | "private";
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
    images: [],
}


const AddEventSection = ({ eventType }: IAddProductSection) => {
    const [eventData, setEventData] = React.useState<TEventRaw>(initialFormData);

    React.useEffect(() => {
        console.log(eventData);
    }, [eventData]);

    return (
        <section className="p-10">
           <EventDataForm formType="create" event={eventData} eventType={eventType} onChange={setEventData}/>
        </section>
    );
};

export default AddEventSection;
