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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const setAndClose = () => {
    props.onchange(state);
    onClose();
  };

  return (
    <Box>
      <Button onClick={onOpen}>Crop</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Crop</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={setAndClose}>
              Set
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
