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
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ScaleController, ScaleState } from "./scale-controller";
import { Scaler } from "./scale";

export function ScaleModal(props: {
  width: number;
  height: number;
  url: string;
  unit: string;
  scale: ScaleState;
  onchange: (crop: ScaleState) => void;
}) {
  const [state, setState] = useState<ScaleState>(props.scale);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const setAndClose = () => {
    props.onchange(state);
    onClose();
  };

  return (
    <Box>
      <Button onClick={onOpen}>Scale</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Scale</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" flex="1">
            <Box as="form">
              <FormControl>
                <FormLabel>Length ({props.unit})</FormLabel>
                <NumberInput
                  value={state.scaleSize}
                  onChange={(_: string, valueAsNumber: number) =>
                    ScaleController.setScaleSize(setState, valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
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
