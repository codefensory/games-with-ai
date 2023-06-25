import { defineComponent, Types } from "bitecs";

export const RectRenderer = defineComponent({
  width: Types.ui16,
  height: Types.ui16,
  color: Types.ui32,
  strokeWidth: Types.ui8,
  strokeColor: Types.ui32,
  containerId: Types.ui8,
});
