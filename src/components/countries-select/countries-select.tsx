import { Select } from "antd";
import React from "react";

interface ICountriesSelect {
    onChange: (value: string) => void;
    value: string;
}

type TSelectOption = {
    value: string;
    label: string;
};

type TCountry = { tags: { [key: string]: string }; id: number };

type TParsedLocation = {
    name: string;
    id: string;
};

const CountriesSelect = ({ onChange, value }: ICountriesSelect) => {
    const [countries, setCountries] = React.useState<Array<TParsedLocation>>([]);
    const [loading, setLoading] = React.useState(true);

    const [countriesOptions, setCountriesOptions] = React.useState<
        TSelectOption[]
    >([]);
    const fetchCountries = async () => {
        console.log("fetching countries");
        try {
            const _countries = await fetch(
                'https://overpass-api.de/api/interpreter?data=[out:json];relation["admin_level"="2"]["name:es"];out tags;'
            ).then((res) => res.json());

            if (
                Array.isArray(_countries.elements) &&
                _countries.elements.length
            ) {
                setCountries(
                    _countries?.elements.map((country: TCountry) => {
                        return {
                            name: country?.tags["name:es"],
                            id: country?.tags["name:es"],
                        };
                    })
                );
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            //implement error
        }
    };

    React.useEffect(() => {
        const _countries = JSON.parse(
            sessionStorage.getItem("countries") || "[]"
        );

        if (_countries?.length) {
            setCountries(_countries);
            handleSetCountryOptions(_countries);
        } else {
            fetchCountries();
        }
    }, []);

    React.useEffect(() => {
        if (countries.length) {
            console.log("countries", countries);
            sessionStorage.setItem("countries", JSON.stringify(countries));
            handleSetCountryOptions(countries);
            setLoading(false);
        }
    }, [countries]);


    const handleSetCountryOptions = React.useCallback(
        (countries: TParsedLocation[]) => {
            setCountriesOptions(
                countries.map((country: TParsedLocation) => {
                    return {
                        value: country?.id,
                        label: country?.name,
                    };
                })
            );
        },
        []
    );


    return <Select
        value={value}
        showSearch
        optionFilterProp="label"
        onChange={onChange}
        options={countriesOptions}
        loading={loading}
    />
};

export default CountriesSelect;