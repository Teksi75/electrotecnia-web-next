export const MDX_STANDARD_ENABLED = process.env.ENABLE_STANDARD_MDX === "true";
export const CAN_USE_STANDARD_MDX = MDX_STANDARD_ENABLED && process.env.MDX_DEPS_READY === "true";
