import { ReactNode } from "react";

type TProps = {
  type: "Bot" | "User";
  children: string | ReactNode;
};

function Message({ type, children }: TProps) {
  return (
    <div className="message" data-type={type}>
      {children}
    </div>
  );
}

export default Message;
