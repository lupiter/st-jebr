import { useState } from "react";
import { Header } from "../header/header";
import {
  VStack,
  Spacer,
  HStack,
  Flex,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Text,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { RaglanState } from "./state";
import { Figures } from "./figures";
import { RaglanTable } from "./table";
import { OptionalInput } from "./optional-input";
import { RequiredInput } from "./required-input";

const fallback = (partialState: {
  chest: number;
  underarm: number;
  sleeve: {
    length: number;
  };
}): RaglanState => ({
  ...partialState,
  sleeve: {
    ...partialState.sleeve,
    bicep: 0.36 * partialState.chest,
    angle: 30,
  },
  neck: {
    width: 0.2 * partialState.chest,
    back: 0.1 * partialState.underarm,
    front: 0.35 * partialState.underarm,
  },
});

export function Raglan() {
  const [showHints, setShowHints] = useState<boolean>(false);
  const [state, setState] = useState<RaglanState>(
    fallback({
      chest: 100,
      underarm: 40,
      sleeve: {
        length: 9,
      },
    })
  );

  const toggleHints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowHints(e.target.checked);
  };

  const setChest = (chest: number) => {
    setState((state) => ({ ...state, chest }));
  };
  const setUnderarm = (underarm: number) => {
    setState((state) => ({ ...state, underarm }));
  };
  const setBicep = (bicep: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, bicep } }));
  };
  const setSleeveLength = (length: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, length } }));
  };
  const setShoulderAngle = (angle: number) => {
    setState((state) => ({ ...state, sleeve: { ...state.sleeve, angle } }));
  };
  const setNeckWidth = (width: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, width } }));
  };
  const setNeckBack = (back: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, back } }));
  };
  const setNeckFront = (front: number) => {
    setState((state) => ({ ...state, neck: { ...state.neck, front } }));
  };
  const reset = () => {
    setState((state) => {
      const defaults = fallback(state);
      return {
        ...state,
        ...defaults,
        neck: { ...state.neck, ...defaults.neck },
        sleeve: { ...state.sleeve, ...defaults.sleeve },
      };
    });
  };

  const defaults = fallback(state);

  const degToRad = (x: number): number => (x * Math.PI) / 180;
  const sleeveAngleRad = degToRad(state.sleeve.angle);

  const shelf = state.chest * 0.02;

  const frontChest = state.chest / 2;
  const chestAfterShelf = frontChest - 2 * shelf;
  const halfBicep = state.sleeve.bicep / 2;
  const halfNeck = state.neck.width / 2;

  const shoulderToArmpit =
    halfBicep * Math.cos(sleeveAngleRad) +
    ((chestAfterShelf - halfNeck) / 2) * Math.tan(sleeveAngleRad);
  const backCastOff =
    (halfNeck - state.neck.back * Math.tan(sleeveAngleRad)) * 2;
  const bodySlopeWidth = (chestAfterShelf - backCastOff) / 2;

  const neckSlopeHeight = state.neck.front - state.neck.back;
  const neckSlopeWidth = neckSlopeHeight * Math.tan(sleeveAngleRad);
  const neckCastOff = backCastOff - neckSlopeWidth * 2;

  const sleeveCastOff = (state.neck.back / Math.cos(sleeveAngleRad)) * 2;
  const sleeveSlopeWidth = (state.sleeve.bicep - shelf * 2 - sleeveCastOff) / 2;

  return (
    <VStack align="stretch">
      <Header />
      <Flex
        m={0}
        gap={6}
        as="main"
        flexDir={"row"}
        padding={6}
        alignItems="start"
        height={"100%"}
        width={"100%"}
        justify="start"
        marginLeft="auto"
        marginRight="auto"
      >
        <HStack
          align="stretch"
          wrap={{ base: "wrap", sm: "nowrap" }}
          justify="center"
          as="form"
          width={"sm"}
        >
          <VStack align="stretch" justify="stretch" flex={1}>
            <Heading as="h4" size="sm">
              Garment measurements
            </Heading>
            <FormControl>
              <FormLabel>Show hints</FormLabel>
              <Switch checked={showHints} onChange={toggleHints} />
            </FormControl>
            <RequiredInput
              label="Chest"
              value={state.chest}
              onChange={setChest}
              showHint={showHints}
              hint="All around widest part between underarms and bottom of garment"
            />
            <RequiredInput
              label="Underarm"
              value={state.underarm}
              onChange={setUnderarm}
              hint="Vertical from armpit to bottom of garment"
              showHint={showHints}
            />

            <RequiredInput
              value={state.sleeve.length}
              label="Sleeve length"
              onChange={setSleeveLength}
              hint="Armpit to end of sleeve"
              showHint={showHints}
            />

            <Button onClick={reset} variant="outline">
              Recalculate from above
            </Button>

            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Advanced
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel gap="1rem" display="flex" flexDir="column">
                  <OptionalInput
                    value={state.sleeve.bicep}
                    label="Bicep"
                    default={defaults.sleeve.bicep}
                    onChange={setBicep}
                    hint="All around widest part of arm"
                    showHint={showHints}
                  />

                  <OptionalInput
                    value={state.sleeve.angle}
                    label="Shoulder slope"
                    default={defaults.sleeve.angle}
                    onChange={setShoulderAngle}
                    hint="Shoulder angle, down from a T-shape, degrees"
                    showHint={showHints}
                  />

                  <OptionalInput
                    value={state.neck.width}
                    label="Neck width"
                    default={defaults.neck.width}
                    onChange={setNeckWidth}
                    hint="Horizontal size of neck hole, across not around"
                    showHint={showHints}
                  />

                  <OptionalInput
                    value={state.neck.back}
                    label="Back neck depth"
                    default={defaults.neck.back}
                    onChange={setNeckBack}
                    hint="Center of neck hole to top edge of back"
                    showHint={showHints}
                  />

                  <OptionalInput
                    value={state.neck.front}
                    label="Front neck depth"
                    default={defaults.neck.front}
                    onChange={setNeckFront}
                    hint="Center of neck hole to bottom of front scoop, if same as back neck depth back and front are the same"
                    showHint={showHints}
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Help
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel gap="1rem" display="flex" flexDir="column">
                  <Heading size="xs" as="h5">
                    Ease
                  </Heading>
                  <Text>
                    The measurements here are final garment measurements, so if
                    you measure <em>yourself</em> the garment will be
                    skin-tight. For a vintage sweater fit, add 5cm or 2in. For a
                    modern looser fit add 10cm or 4in. The easiest way to find
                    how much ease you want is to compare your body measurements
                    to some garments you like the fit of (tshirt, sweatshirt,
                    etc).
                  </Text>
                  <Heading size="xs" as="h5">
                    Units
                  </Heading>
                  <Text>
                    You can enter centimeters, mm, inches, or whatever unit you
                    like, and the results will come out in the same units. For
                    the shoulder slope angle in "advanced" however, you do need
                    to enter decimal degrees and not radians (sorry maths
                    nerds).
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </HStack>
        <VStack align="center" justify="center" flex={1}>
          <Figures
            frontChest={frontChest}
            shoulderToArmpit={shoulderToArmpit}
            shelf={shelf}
            bodySlopeWidth={bodySlopeWidth}
            state={state}
            neckSlopeWidth={neckSlopeWidth}
            backCastOff={backCastOff}
            neckCastOff={neckCastOff}
            sleeveSlopeWidth={sleeveSlopeWidth}
            sleeveCastOff={sleeveCastOff}
            halfNeck={halfNeck}
            sleeveAngleRad={sleeveAngleRad}
            halfBicep={halfBicep}
            chestAfterShelf={chestAfterShelf}
          />
          <RaglanTable
            frontChest={frontChest}
            state={state}
            shelf={shelf}
            bodySlopeWidth={bodySlopeWidth}
            neckSlopeWidth={neckSlopeWidth}
            sleeveSlopeWidth={sleeveSlopeWidth}
            shoulderToArmpit={shoulderToArmpit}
            neckSlopeHeight={neckSlopeHeight}
            backCastOff={backCastOff}
            neckCastOff={neckCastOff}
            sleeveCastOff={sleeveCastOff}
          />
        </VStack>
        <Spacer m={2} flex={0} />
      </Flex>
    </VStack>
  );
}
