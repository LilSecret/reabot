import { ReactNode } from "react";
import { TMessageType } from "../../types";

type TProps = {
  type: TMessageType;
  children: ReactNode;
};

function Message({ type, children }: TProps) {
  return (
    <div className="message" data-type={type}>
      {children}
    </div>
  );
}

export default Message;
