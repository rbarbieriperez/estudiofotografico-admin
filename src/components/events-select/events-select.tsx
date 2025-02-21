import { Select } from "antd";
import { TEvent } from "../../types/types";
import React from "react";

interface IEventSelect {
  events: TEvent[];
  onChange: (event: TEvent) => void;
  eventType: 'public' | 'private';
  value: string;
  disabled?: boolean;
}

const EventSelect = ({ events, onChange, eventType, value, disabled = false }: IEventSelect) => {


  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  const getOptions = () => {
    return events.filter((event) => event.event_type_id === (eventType === 'public' ? 1 : 2))
      .map((event) => ({ label: `${getDate(event.date)}-${event.name}-${event.city}-${event.department}-${event.country}`, value: event.event_id.toString() }));
    ;
  }

  React.useEffect(() => {
    console.log(value);
  }, [value]);
  
  return <Select
    options={getOptions()}
    onChange={(changeValue) => onChange(events.find((event) => event.event_id === Number(changeValue)) || events[0])}
    showSearch
    optionFilterProp="label"
    placeholder="Seleccione un evento"
    value={value || null}
    disabled={disabled}
  />
};

export default EventSelect;