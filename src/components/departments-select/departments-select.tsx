import { Select } from "antd";
import React from "react";


interface IDepartmentsSelect {
    countryId: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    value: string;
}

type TSelectOption = {
    value: string;
    label: string;
};

type TDepartment = { tags: { [key: string]: string }; id: number };


const DepartmentsSelect = ({countryId, onChange, disabled, value}: IDepartmentsSelect) => {
    const [departmentsOptions, setDepartmentsOptions] = React.useState<
        TSelectOption[]
    >([]);
    const [loading, setLoading] = React.useState(true);
    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const _departments = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];area["name:es"="${countryId}"]->.searchArea;(relation["admin_level"="4"](area.searchArea););out tags;`).then((res) => res.json());

            if (
                Array.isArray(_departments.elements) &&
                _departments.elements.length
            ) {
                setDepartmentsOptions(
                    _departments?.elements.map((department: TDepartment) => {
                        return {
                            value: department?.tags["name:es"] || department?.tags["name"],
                            label: department?.tags["name:es"] || department?.tags["name"],
                        };
                    })
                );

                setLoading(false);
            }
        } catch (ee) {
            console.log(ee);
            setLoading(false);
        }
    };


    React.useEffect(() => {
        if (countryId) {
            setDepartmentsOptions([]);
        }
    }, [countryId]);

    React.useEffect(() => {
        if (!departmentsOptions.length) {
            fetchDepartments();
        }
    }, [departmentsOptions]);

    return <Select
        showSearch
        optionFilterProp="label"
        placeholder="Departamentos*"
        loading={loading}
        options={departmentsOptions}
        onChange={onChange}
        value={value}
        disabled={disabled || loading}
    />
};

export default DepartmentsSelect;