import {useEffect, useState} from "react";
import {getRegions} from "../../../api/regions";
import Select from "./Select";

function RegionInput({set}){
    const [regionsList, setRegionsList] = useState([]);
    const [region, setRegion] = useState({});

    function changeHandler(value) {
        setRegion(value);
        set(value.label);
    }

    useEffect(async () => {
        const { data }  = await getRegions();
        setRegionsList(data.map((region) => ({
            id: region.id,
            label: region.name,
            value: region.name,
        })));
    }, []);
    return (<Select options={regionsList} currentOption={region} setOption={changeHandler} title="Район"/>);
}

export default RegionInput;