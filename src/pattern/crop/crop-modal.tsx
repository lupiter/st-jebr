import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Box,
  ModalFooter,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBackdrop,
  DialogHeader,
  DialogCloseTrigger,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from "@chakra-ui/react";
import { CropBox } from "./cropbox";
import { useRef, useState } from "react";
import { CropController, CropState } from "./crop-controller";
import { HANDLE_RADIUS } from "../measures";

export function CropModal(props: {
  width: number;
  height: number;
  url: string;
  crop: CropState;
  onchange: (crop: CropState) => void;
}) {
  const [state, setState] = useState<CropState>(props.crop);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const setAndClose = () => {
    props.onchange(state);
  };

  return (
    <DialogRoot size="full">
      <DialogTrigger asChild>
        <Button>Crop</Button>
      </DialogTrigger>

      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <Heading size="md">Crop</Heading>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <svg
            viewBox={`0 0 ${props.width} ${props.height}`}
            // width="80vw"
            // height="80vh"
            preserveAspectRatio="xMaxyMax"
            ref={svgRef}
            onMouseMove={(e) =>
              CropController.onMouseMove(setState, svgRef, e, props.width)
            }
            onMouseUp={() => CropController.onMouseUp(setState)}
            onMouseLeave={() => CropController.onMouseUp(setState)}
            style={{
              cursor: state.moving != undefined ? "grabbing" : "default",
              objectFit: "contain",
              flex: 1,
              background: "white",
            }}
          >
            <defs>
              <mask id="cropbox">
                <rect
                  x={state.x0 - HANDLE_RADIUS * 2}
                  y={state.y0 - HANDLE_RADIUS * 2}
                  width={state.x1 - state.x0 + HANDLE_RADIUS * 4}
                  height={state.y1 - state.y0 + HANDLE_RADIUS * 4}
                  fill="white"
                />
                <rect
                  x={state.x0}
                  y={state.y0}
                  width={state.x1 - state.x0}
                  height={state.y1 - state.y0}
                  fill="black"
                />
              </mask>
            </defs>
            <image
              href={props.url}
              aria-label="your image"
              width={props.width}
              height={props.height}
              x={0}
              y={0}
            />

            <CropBox state={state} setState={setState} />
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
