import React from "react";
import useService from "../../hooks/useService";
import { Select } from "antd";

interface ICategoriesSelect {
    onChange: (value: string) => void;
    categoryGroupId: string;
    disabled?: boolean;
    value: string;
}

type TSelectOption = {
    value: string;
    label: string;
};

type TCategoryGroup = {
    event_category_id: string;
    name: string;
}

const CategoriesSelect = ({ onChange, categoryGroupId, disabled, value }: ICategoriesSelect) => {
    const [categories, setCategories] = React.useState<TSelectOption[]>([]);
    const { data, fetchData } = useService();
    const [loading, setLoading] = React.useState(false);

    const fetchCategoriesData = async () => {
        await fetchData({
            api: 'catalogs/categories',
            method: 'GET',
            params: { 'category-group-id': categoryGroupId }
        });
    }

    React.useEffect(() => {
        setCategories([]);
        setLoading(true);
    }, [categoryGroupId]);

    React.useEffect(() => {
        if (!categories.length && Number(categoryGroupId)) {
            fetchCategoriesData();
        }
    }, [categories]);

    React.useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length && !categories.length) {
            setLoading(false);
            setCategories(data.data.map((item: TCategoryGroup) => ({
                value: item['event_category_id'],
                label: item['name'],
            })));
        }
    }, [data]);

    const handleChange = (value: string) => {
        onChange(value);
    }

    return (
        <Select loading={loading && !!Number(categoryGroupId)} value={value} disabled={disabled} placeholder="Tipo de evento*" options={categories} onChange={handleChange}/>
    )
}

export default CategoriesSelect;