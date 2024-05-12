import { FC } from "react";

const ArrayColumItems: FC<{ items: React.ReactNode[] }> = ({ items }) => {

    return (
        <div className="flex flex-col">
            {items?.map((item, i) => (
                <div key={i} className="block capitalize">
                    {item}
                </div>
            ))}
        </div>
    );
}

export default ArrayColumItems