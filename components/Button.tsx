import { ButtonProps } from "@/lib/props";

const Button = ({ handleClick, disabled = false, children, className }: ButtonProps) => {
    return (
        <button onClick={handleClick} disabled={disabled} className={className}>
            {children}
        </button>
    );
};

export default Button;
