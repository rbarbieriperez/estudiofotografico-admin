import React from "react";
import { useGlobal } from "../../hooks/useGlobal";
import useService from "../../hooks/useService";
import { TEvent } from "../../types/types";
import EventPreviewCard from "../../components/event-preview-card/event-preview-card";
import { Collapse, Select, Skeleton } from "antd";
import EventPreviewList from "../../components/event-preview-list/event-preview-list";
import { s } from 'vite';

type TQueryRecord = {
    [key: string]: {
        "order": "asc" | "desc",
        "order-by": string
    }
}

const QueryRecord: TQueryRecord = {
    "creation-date-asc": {
        "order": "asc",
        "order-by": 'creation_date'
    },
    "creation-date-desc": {
        "order": "desc",
        "order-by": 'creation_date'
    },
    "number-of-images-asc": {
        "order": "asc",
        "order-by": 'total_images'
    },
    "number-of-images-desc": {
        "order": "desc",
        "order-by": 'total_images'
    },
    "solds-asc": {
        "order": "asc",
        "order-by": 'solds' // fix
    },
    "solds-desc": {
        "order": "desc",
        "order-by": 'solds' // fix
    }
}

interface IMainSection {
    onUpdate: (event: TEvent) => void;
    onDelete: (event: TEvent) => void;
}


const MainSection = ({ onUpdate, onDelete }: IMainSection) => {
    const [loading, setLoading] = React.useState(true);
    const [selectedFilter, setSelectedFilter] = React.useState<string>("");
    const { events, setEvents, shouldRefresh } = useGlobal();
    const { data, fetchData } = useService(true);

    React.useEffect(() => {
        if (!shouldRefresh) return;
        console.log('loading events again...');
        fetchData({
            api: "events",
            method: "GET",
            params: {
                "order-by": 'creation_date',
                "order": 'desc'
            },
        });
    }, [shouldRefresh]);

    React.useEffect(() => {
        console.log(data);
        if (data?.code === 200) {
            setLoading(false);
            setEvents(data.data as TEvent[]);
        }

        if (data?.code === 204) {
            setLoading(false);
            setEvents([]);
        }
    }, [data]);

    const onFilterChange = (event: string) => {
        setSelectedFilter(event);
        if (event in QueryRecord) {
            setLoading(true);
            fetchData({
                api: "events",
                method: "GET",
                params: QueryRecord[event]
            });
        }
    }

    

    return (
        <section className="mt-4 p-4 flex flex-col md:w-3/4 md:mx-auto">
            {loading && <Skeleton active />}

            {!loading && events && <Collapse items={[
                {
                    key: 'events',
                    label: 'Eventos registrados',
                    children: <EventPreviewList onUpdate={onUpdate} onDelete={onDelete} filterSelected={selectedFilter} events={events || []} onSelectedFilter={onFilterChange}/>
                }
            ]}/>}

            
            
        </section>
    );
};

export default MainSection;
