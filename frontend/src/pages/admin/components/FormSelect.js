import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const FormSelect = ({props, options, validate, errorMessage}) => {
    const error = validate ? !validate(props.value) : false;
    return (
        <FormControl style={{width: '100%'}} error={error}>
                <Select
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                >
                    {
                        options.map(option => (
                            <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
                        ))
                    }
                </Select>
            {(error) ? (<FormHelperText error>{errorMessage}</FormHelperText>) : null}
        </FormControl>
    );
};
export default FormSelect;
