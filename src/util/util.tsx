import { useState } from "react";
import { DropdownButton } from "react-bootstrap";

/** Delays an async function such that it takes at leas ms milli-seconds.
 *
 * Does not delay if it is not resolved within that time frame.
 */
export const delayAtLeast = async (cb: () => Promise<any>, ms: number) => {
  const started = Date.now();
  const res = await cb();
  const elapsed = Date.now() - started;
  const delayFurther = ms - elapsed;
  if (delayFurther > 0) {
    await new Promise((r) => setTimeout(r, delayFurther));
  }
  return res;
};

export function undefinedToNull<Type>(inp: Type | null | undefined) {
  if (inp === undefined) {
    return null;
  }
  return inp;
}

const isSVG = (el: any) => el.nodeName.toLowerCase() === "svg";

export const StayOpenDropdown = ({ children, ...rest }: any) => {
  const [show, setShow] = useState(false);
  const onToggle = (isOpen: boolean, e: any) => {
    const target = e.originalEvent.target;

    // Do not close if target belongs to group selection input field!
    const elIsSVG = isSVG(target);
    const firstChildIsSVG = isSVG(target.firstChild);
    const str = target.firstChild.id;
    if (elIsSVG || firstChildIsSVG || (str && str.startsWith("react-select"))) {
      console.log("not closing");
      return;
    }
    const isShown = isOpen;
    setShow(isShown);
  };

  return (
    <DropdownButton show={show} onToggle={onToggle} {...rest}>
      {children}
    </DropdownButton>
  );
};
