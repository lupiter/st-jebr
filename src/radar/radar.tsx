import { useState } from "react";
import "./radar.css";
import { Header } from "../header/header";
import { GaugeState, UNIT } from "../app-state";
import {
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spacer,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { ModalGauge } from "../guage/gauge";
import { Pattern } from "../pattern/pattern";
import { RadarHelp } from "./help";
import { FileModal, ImageState } from "./file-modal";

type RadarState = {
  gauge: GaugeState;
  row: number;
  image?: ImageState;
  error?: string;
};

export function Radar() {
  const [state, setState] = useState<RadarState>({
    gauge: {
      stitches: 14,
      rows: 21,
      unit: UNIT.CM,
      square: 10,
    },
    row: 0,
  });

  const gaugeChange = (gauge: GaugeState) => {
    setState({
      ...state,
      gauge,
    });
  };

  const fileChange = (image?: ImageState) => {
    if (image) {
      setState((prev) => ({
        ...prev,
        image,
      }));
    } else {
      setState((prev) => ({ ...prev, image: undefined, error: undefined }));
    }
  };

  return (
    <Flex
      padding={2}
      flexDir={"column"}
      style={{ height: "100vh", width: "100vw" }}
    >
      <VStack flex={1} alignItems={"stretch"} gap={0}>
        <Header />
        <Flex
          as="main"
          flexDir={"column"}
          alignItems={"stretch"}
          height={"100%"}
        >
          <HStack
            wrap={"wrap"}
            justifyContent={"center"}
            alignItems={"baseline"}
          >
            <RadarHelp />
            <ModalGauge gauge={state.gauge} onchange={gaugeChange} />
            <FileModal onchange={fileChange} />
          </HStack>
          <Spacer m={2} flex={0} />

          {state.error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>There was a problem reading your image</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state.image && (
            <Flex flex={1}>
              <Pattern
                url={state.image.url}
                height={state.image.height}
                width={state.image.width}
                unit={state.gauge.unit}
                gauge={state.gauge}
              />
            </Flex>
          )}
        </Flex>
      </VStack>
    </Flex>
  );
}
