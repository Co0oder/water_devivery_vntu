import {useState, useEffect} from "react"
import DropDownContainer from "../styled/DropDownContainer";
import DropDownHeader from "../styled/DropDownHeader";
import DropDownListContainer from "../styled/DropDownListContainer";
import DropDownList from "../styled/DropDownList";
import ListItem from "../styled/ListItem";


function Select({ title, options, width, currentOption, setOption }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setOption(value)
        setIsOpen(false)
    };

    return (
        <>
            <DropDownContainer width={width} tabIndex="0" onBlur={() => setIsOpen(false)}>
                <DropDownHeader onClick={toggling}>{currentOption.label || title}</DropDownHeader>
                {isOpen && (
                    <DropDownListContainer>
                        <DropDownList>
                            {options.map(option => (
                                <ListItem onClick={onOptionClicked(option)} key={option.id}>
                                    {option.label}
                                </ListItem>
                            ))}
                        </DropDownList>
                    </DropDownListContainer>
                )}
            </DropDownContainer>
        </>
    )
}

export default Select;
