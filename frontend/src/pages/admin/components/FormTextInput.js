import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {Input} from "@material-ui/core";

const FormTextInput = ({props, validate, mask, errorMessage}) => {
    const error = validate ? !validate(props.value) : false;
    return (
        <FormControl style={{width: '100%'}}>
            <Input
                value={props.value}
                error={error}
                onChange={(e) => props.onChange(e.target.value)}
                inputComponent={mask}
            />
            {(error) ? (<FormHelperText error>{errorMessage}</FormHelperText>) : null}
        </FormControl>
    );
};
export default FormTextInput;
