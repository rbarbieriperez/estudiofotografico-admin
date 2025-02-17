import React from "react";
import useService from "../../hooks/useService";
import { Select } from "antd";

interface ICategoryGroupsSelect {
    onChange: (value: string) => void;
}

type TSelectOption = {
    value: string;
    label: string;
};

type TCategoryGroup = {
    event_category_group_id: string;
    name: string;
}

const CategoryGroupsSelect = ({ onChange }: ICategoryGroupsSelect) => {
    const [categoryGroups, setCategoryGroups] = React.useState<TSelectOption[]>([]);
    const { data, fetchData } = useService();

    const fetchCategoryGroupsData = async () => {
        await fetchData({
            api: 'catalogs/category-groups',
            method: 'GET',
        });
    }

    React.useEffect(() => {
        if (!categoryGroups.length) {
            fetchCategoryGroupsData();
        }
    }, []);

    React.useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length && !categoryGroups.length) {
            setCategoryGroups(data.data.map((item: TCategoryGroup) => ({
                value: item['event_category_group_id'],
                label: item['name'],
            })));
        }
    }, [data]);

    return (
        <Select placeholder="Categoría*" options={categoryGroups} onChange={onChange}/>
    )
}

export default CategoryGroupsSelect;