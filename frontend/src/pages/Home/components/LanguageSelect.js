import {Select, MenuItem, FormControl} from '@material-ui/core'

function LanguageSelect(){

    function handleChange(ln){
        localStorage.setItem('language',ln);
        window.location.reload();
    }
    
    function getCurrentLanguage(){
        const ln = localStorage.getItem('language');
        return ln ? ln : 'ua'
    }

    return (
        <FormControl variant="outlined">
            <Select
                value={getCurrentLanguage()}
                onChange={(e) => handleChange(e.target.value)}
            >
                <MenuItem value={"ua"}>ua</MenuItem>
                <MenuItem value={"ru"}>ru</MenuItem>
            </Select>
        </FormControl>
    )
}

export default LanguageSelect;