import {
  Button,
  Heading,
  Box,
  NumberInputRoot,
} from "@chakra-ui/react";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../components/ui/dialog";
import { useRef, useState } from "react";
import { ScaleController, ScaleState } from "./scale-controller";
import { Scaler } from "./scale";
import { NumberInputField } from "../../components/ui/number-input";
import { Field } from "../../components/ui/field";
import { DialogActionTrigger, DialogFooter } from "../../components/ui/dialog";

export function ScaleModal(props: {
  width: number;
  height: number;
  url: string;
  unit: string;
  scale: ScaleState;
  onchange: (crop: ScaleState) => void;
}) {
  const [state, setState] = useState<ScaleState>(props.scale);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const setAndClose = () => {
    props.onchange(state);
  };

  return (
    <DialogRoot size="full">
      <DialogActionTrigger asChild>
        <Button>Scale</Button>
      </DialogActionTrigger>

      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <Heading size="md">Scale</Heading>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody display="flex" flexDir="column" flex="1">
          <Box as="form">
            <Field label={`Length ({props.unit})`}>
              <NumberInputRoot
                value={state.scaleSize.toLocaleString()}
                onValueChange={(e) =>
                  ScaleController.setScaleSize(setState, e.valueAsNumber)
                }
              >
                <NumberInputField></NumberInputField>
              </NumberInputRoot>
            </Field>
          </Box>
          <svg
            viewBox={`0 0 ${props.width} ${props.height}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMinYMin"
            ref={svgRef}
            onMouseMove={(e) =>
              ScaleController.onMouseMove(setState, svgRef, e, props.width)
            }
            onMouseUp={() => ScaleController.onMouseUp(setState)}
            onMouseLeave={() => ScaleController.onMouseUp(setState)}
            style={{
              cursor: state.moving != undefined ? "grabbing" : "default",
              objectFit: "contain",
              flex: 1,
              background: "white",
            }}
          >
            <defs></defs>
            <image
              href={props.url}
              aria-label="your image"
              width={props.width}
              height={props.height}
              x={0}
              y={0}
            />

            <Scaler state={state} setState={setState} />
          </svg>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorScheme="green" onClick={setAndClose}>
              Set
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
