import { ChangeEvent, useState } from "react";
import "./card.css";
import { Header } from "../header/header";
import { UNIT } from "../app-state";
import { FairIsle } from "./fair-isle/fair-isle";
import { chunk } from "./measurements";
import {
  Box,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spacer,
  Link,
  useMultiStyleConfig,
  Button,
  InputRightElement,
  InputGroup,
  Heading,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type LoadingErrorState = {
  message: string;
};

type PixelDataState = {
  pixels: number[][];
  width: number;
  url: string;
};

type CardState = {
  maxWidth?: number;
  maxHeight?: number;
  unit: UNIT;
  content?: LoadingErrorState | PixelDataState;
};

function isDataState(
  content: LoadingErrorState | PixelDataState,
): content is PixelDataState {
  return (content as PixelDataState).pixels !== undefined;
}

function isErrorState(
  content: LoadingErrorState | PixelDataState,
): content is LoadingErrorState {
  return (content as LoadingErrorState).message !== undefined;
}

export function Card() {
  const [state, setState] = useState<CardState>({
    maxWidth: 21,
    maxHeight: 60,
    unit: UNIT.CM,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setMaxHeight = (_valueAsString: string, valueAsNumber: number) => {
    setState({ ...state, maxHeight: valueAsNumber });
  };

  // const setMaxWidth = (e: ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, maxWidth: parseFloat(e.target.value) });
  // };

  const setUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      unit: e.target.value === UNIT.CM.toString() ? UNIT.CM : UNIT.IN,
    });
  };

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      setState({ ...state, content: undefined });
      return;
    }
    const file = files[0];
    const bitmap = await createImageBitmap(file);
    const url = await URL.createObjectURL(file);
    const width = bitmap.width;
    const height = bitmap.height;
    if (width > 200 || height > 200) {
      setState({
        ...state,
        content: {
          message: `That image is ${width}x${height}px which is a bit large for a knitting project and won't generate good cards. Consider resizing it, or choosing another.`,
        },
      });
      return;
    }
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(bitmap, 0, 0);
    const data = ctx?.getImageData(0, 0, width, height).data;
    if (!data) {
      setState({
        ...state,
        content: { message: "Sorry, we had trouble reading that image." },
      });
      return;
    }
    const pixels = chunk(Array.from(data), 4);

    setState({ ...state, content: { pixels, width, url } });
  };

  let maxHeightMM = state.maxHeight ? state.maxHeight * 10 : undefined;
  if (state.unit === UNIT.IN && state.maxHeight) {
    maxHeightMM = state.maxHeight * 25.4;
  }
  const styles = useMultiStyleConfig("Button", { variant: "outline" });

  return (
    <VStack align="stretch">
      <Header />
      <VStack
        alignSelf="center"
        m={2}
        maxW="3xl"
        width={"100%"}
        justify="center"
        marginLeft="auto"
        marginRight="auto"
      >
        <Box as="main">
          <VStack as="form">
            <FormControl as="fieldset">
              <FormLabel as="legend">Maximum page size</FormLabel>
              <HStack>
                <NumberInput
                  value={state.maxHeight}
                  onChange={setMaxHeight}
                  size="md"
                  maxW={24}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Select
                  value={state.unit.toString()}
                  onChange={setUnit}
                  aria-label="units"
                  size="md"
                  maxW={24}
                >
                  <option value="cm">cm</option>
                  <option value="in">inch</option>
                </Select>
              </HStack>
              <FormHelperText>Height</FormHelperText>
            </FormControl>
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
                {state.content && isDataState(state.content) && (
                  <InputRightElement
                    as="img"
                    src={state.content.url}
                    style={{
                      width: `${1.333 * state.content.width}px`,
                      height: `${
                        state.content.pixels.length / state.content.width
                      }px`,
                    }}
                    title="your image"
                  />
                )}
              </InputGroup>
            </FormControl>
          </VStack>
          <Spacer m={5} />
          <Button onClick={onOpen}>Help?</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Heading size="md">Knitting punchcards from images</Heading>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={2} align="stretch">
                  <Heading size="sm">What?</Heading>
                  <Text>
                    Make files for cutting machines (e.g. silhouette, cricut,
                    etc) to make punchcards for knitting machines (e.g. Brother
                    KH-860)
                  </Text>
                  <Heading size="sm">Images</Heading>
                  <Text>
                    The image should have the height and width in pixels that
                    you want in stitches. That means to make a card 24 stitches
                    wide and 60 rows long, you want to upload a 24x60 pixel
                    image. These can be made using the image editor of your
                    choice.
                  </Text>
                  <Heading size="sm">Cutting</Heading>
                  <Text>
                    I tend to use A4 plastic folder dividers, which can be
                    purchased very cheaply from stationary and department
                    stores. I have also heard of people using cardstock. You may
                    want to practice with cardstock or paper which is easier to
                    recycle.
                  </Text>
                  <Heading size="sm">Silhouette Users</Heading>
                  <Text>
                    The "basic" level of Silhouette Studio doesn't let you use
                    SVGs. If you don't want to upgrade, try the{" "}
                    <Link
                      href="https://github.com/fablabnbg/inkscape-silhouette/wiki"
                      isExternal
                      color="pink.500"
                    >
                      Inkscape Silhouette Plugin <ExternalLinkIcon />
                    </Link>
                    . You could also use Inkscape to export as PNG and trace in
                    Silhouette Studio - this sometimes works, but I find it to
                    produce less reliable cards.
                  </Text>
                  <Heading size="sm">Privacy</Heading>
                  <Text>
                    Images are not stored or transmitted in any way - it's all
                    done in your browser.
                  </Text>
                </VStack>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>

          {state.content && isErrorState(state.content) && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>There was a problem generating your card</AlertTitle>
              <AlertDescription>{state.content.message}</AlertDescription>
            </Alert>
          )}

          {state.content && isDataState(state.content) && (
            <FairIsle
              data={state.content.pixels}
              width={state.content.width}
              maxHeight={maxHeightMM}
            />
          )}
        </Box>
      </VStack>
    </VStack>
  );
}
