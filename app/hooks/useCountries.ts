
import countries, {Country} from 'world-countries'

const formattedCountries = countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

export const useCountries = () => {
    const getAll = () => formattedCountries

    const getByValue = (value: string) => {
        return formattedCountries.find(c => c.value === value)
    }

    return {
        getAll,
        getByValue
    }
}
