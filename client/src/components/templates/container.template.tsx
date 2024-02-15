import React, { ReactNode } from "react";

function ContainerTemplate({ children }: { children: ReactNode }) {
  return <div className="w-full px-12">{children}</div>;
}

export default ContainerTemplate;
