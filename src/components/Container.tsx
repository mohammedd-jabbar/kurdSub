import { TContainer } from "../lib/types";

// children mean other content in the page
export default function Container({ children }: TContainer) {
  return <div className="max-w-[1920px] mx-auto">{children}</div>;
}
