import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const FormTextInput = ({props, validate, errorMessage}) => {
    const error = validate ? !validate(props.value) : false;
    return (
        <FormControl style={{width: '100%'}}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e) => props.onChange(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
                <Button component="span" variant="contained" color="primary">
                    завантажити
                </Button>
            </label>
            {(error) ? (<FormHelperText error>{errorMessage}</FormHelperText>) : null}
            {(!error) ? (<FormHelperText>Завантажено</FormHelperText>) : null}
        </FormControl>
    );
};
export default FormTextInput;
