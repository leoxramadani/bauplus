import { PropsWithChildren } from "react"

type propsType = PropsWithChildren<
    {
        isProgress: any,
        type?: "submit" | "button" | "reset" | undefined,
        className?: string,
        onClick?: any,
        disabled?: any
    }>

const Button = ({ children, isProgress, type, className, onClick, disabled }: propsType) => {
    return (
        <button type={type} className={`${className}`} onClick={onClick} disabled={disabled}>
            {isProgress !== true &&
                (
                    <span>
                        {children}
                    </span>
                )}
            {isProgress === true && (
                <span className="loading"><i></i><i></i><i></i></span>
            )}
        </button>
    )
}

export default Button