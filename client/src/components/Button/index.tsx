import { MouseEventHandler } from "react"

interface Props {
    name?: JSX.Element
    disabled?: boolean
    action?: MouseEventHandler<HTMLButtonElement>,
    rounded: boolean
    icon?: JSX.Element
    className?: string
    buttonType: "button" | "submit" | "reset" | undefined
}

const Button = ({ name, disabled, action, rounded, icon, className, buttonType }: Props) => {
    return (
        <button
            type={buttonType}
            disabled={disabled}
            className={`bg-black hover:bg-blue-700 text-white text-sm p-4 ${rounded ? 'rounded-[24px]' : ''} ${className} flex items-center justify-center whitespace-normal break-words`}
            onClick={action}
        >
            {icon && <span>{icon}</span>}
            {name}
        </button>
    );
};

export default Button;