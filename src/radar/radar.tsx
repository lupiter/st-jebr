import { ChangeEvent, useState } from "react";
import "./radar.css";
import { Header } from "../header/header";
import { GaugeState, UNIT } from "../app-state";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spacer,
  useMultiStyleConfig,
  InputGroup,
  HStack,
} from "@chakra-ui/react";
import { Gauge } from "../guage/gauge";
import { Pattern } from "../pattern/pattern";
import { RadarHelp } from "./help";

type ImageState = {
  width: number,
  height: number, 
  url: string
}

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

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      setState({ ...state, image: undefined, error: undefined });
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.onload = async () => {
      const bitmap = await createImageBitmap(img);
      setState((prev) => ({
        ...prev,
        image: { url, width: bitmap.width, height: bitmap.height },
      }));
    }
    img.src = url;
  };

  const styles = useMultiStyleConfig("Button", { variant: "outline" });

  return (
    <Center margin={2}>
      <VStack maxW="3xl">
        <Header />
        <Box as="main">
          <VStack as="form">
            <Gauge gauge={state.gauge} onchange={gaugeChange} />
            <HStack justify={"start"} align={"end"}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <InputGroup>
                  <Input
                    type="file"
                    onChange={fileChange}
                    accept="image/*"
                    border="none"
                    paddingInlineStart={0}
                    sx={{
                      "::file-selector-button": {
                        border: "none",
                        outline: "none",
                        mr: 2,
                        ...styles,
                      },
                    }}
                  />
                </InputGroup>
              </FormControl>
              <RadarHelp />
            </HStack>
          </VStack>
          <Spacer m={5} />

          {state.error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>There was a problem reading your image</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state.image && (
            <Box>
              <Pattern
                url={state.image.url}
                height={state.image.height}
                width={state.image.width}
                unit={state.gauge.unit}
                gauge={state.gauge}
              />
            </Box>
          )}
        </Box>
      </VStack>
    </Center>
  );
}
