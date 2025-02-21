import { Select } from "antd";
import React from "react";

interface ICitiesSelect {
    countryId: string;
    departmentId: string;
    onChange: (value: string) => void;
    value: string;
}

type TSelectOption = {
    value: string;
    label: string;
};

type TCity = { tags: { [key: string]: string }; id: number };



const CitiesSelect = ({countryId, departmentId, onChange, value}: ICitiesSelect) => {
    const [loading, setLoading] = React.useState(true);
    const [cities, setCities] = React.useState<TSelectOption[]>([]);

    const fetchCities = async () => {
        try {
            const res = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];area["name:es"="${countryId}"]->.countryArea;(area["name:es"="${departmentId}"](area.countryArea)->.deptArea;node["place"~"city|town|village"](area.deptArea););out tags;`)
                .then((res) => res.json());

            setLoading(false);
            if (Array.isArray(res.elements) && res.elements.length) {
                setCities(
                    res?.elements.reduce((acc: TSelectOption[],city: TCity ) => {
                        if (!acc.find(item => [city?.tags["name:es"] || city?.tags["name"]].includes(item.label))) {
                            acc.push ({
                                value: city?.tags["name:es"] || city?.tags["name"],
                                label: city?.tags["name:es"] || city?.tags["name"],
                            });
                        }
                        return acc;
                    }, [])
                );
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    React.useEffect(() => {
        if (countryId && departmentId) {
            setCities([]);
            setLoading(true);
        }
    }, [countryId, departmentId]);

    React.useEffect(() => {
        if (countryId && departmentId && !cities.length) {
            fetchCities();
        }
    }, [cities]);

    return (
        <Select
            showSearch
            placeholder="Ciudad"
            optionFilterProp="label"
            onChange={onChange}
            loading={loading && !!departmentId && !!countryId}
            options={cities}
            disabled={!countryId || !departmentId || loading || !cities.length}
            value={value}
        />);
};

export default CitiesSelect;