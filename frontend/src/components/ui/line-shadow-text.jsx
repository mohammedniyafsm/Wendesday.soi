import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function LineShadowText({
  children,
  shadowColor = "white",
  className,
  as: Component = "span",
  ...props
}) {
  const MotionComponent = motion(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    return null; // Handle non-string gracefully or just return children wrapped
  }

  return (
    <Component className={cn("relative inline-block", className)} {...props}>
      <span className="relative z-10">{content}</span>
      <MotionComponent
        className="absolute top-0 left-0 z-0 text-transparent pointer-events-none select-none"
        initial={{ textShadow: `0 0 0px ${shadowColor}` }}
        whileHover={{
            textShadow: Array.from({ length: 20 }).map((_, i) => 
                `${i * -1}px ${i * 1}px 0px ${shadowColor}`
            ).join(","),
        }}
        animate={{
            textShadow: Array.from({ length: 15 }).map((_, i) => 
                `${i * -1}px ${i * 1}px 0px ${shadowColor}`
            ).join(","),
        }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        {content}
      </MotionComponent>
    </Component>
  );
}
