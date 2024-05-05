import { ChangeEvent, useState } from "react";
import style from "./shapes.module.css";
import {
  VStack,
  Text,
  HStack,
  Heading,
  FormControl,
  FormHelperText,
  NumberInput,
  NumberInputStepper,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

type EvenState = {
  before: number;
  after: number;
};

export function Even(): JSX.Element {
  const [state, setState] = useState<EvenState>({ before: 60, after: 50 });

  let aspectBefore = 100;
  let aspectAfter = 100;
  let offsetBefore = 1;
  let offsetAfter = 1;
  if (state.after > state.before) {
    aspectBefore = aspectBefore * (state.before / state.after);
    offsetBefore = (aspectAfter - aspectBefore) / 2;
  } else {
    aspectAfter = aspectAfter * (state.after / state.before);
    offsetAfter = (aspectBefore - aspectAfter) / 2;
  }

  const setBefore = (_: string, numberValue: number) => {
    setState({
      ...state,
      before: numberValue,
    });
  };
  const setAfter = (_: string, numberValue: number) => {
    setState({
      ...state,
      after: numberValue,
    });
  };

  const change = state.after - state.before;
  const changeRepeat = Math.floor(state.before / Math.abs(change));
  const remainder = state.before - Math.abs(change) * changeRepeat;
  const start = Math.floor(changeRepeat / 2 + remainder / 2);
  const end =
    state.before - (start + 1 + (Math.abs(change) - 1) * changeRepeat);

  const startStiches = start > 0 ? new Array(start).fill(0) : [];
  const patternStitches =
    changeRepeat > 0 ? new Array(changeRepeat).fill(0) : [];
  const endStitches = end > 0 ? new Array(end).fill(0) : [];
  const svgWidth = Math.max(
    102,
    start * 10 + changeRepeat * 10 + end * 10 + 40
  );

  return (
    <VStack spacing={2} align="stretch">
      <Text>
        Cuff to sleeve, ribbing to body, working in the round generally
      </Text>
      <HStack as="fieldset">
        <Heading size="sm" as="legend">
          Change
        </Heading>
        <FormControl maxW={40}>
          <FormLabel>Before</FormLabel>
          <NumberInput value={state.before} onChange={setBefore}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>stitches</FormHelperText>
        </FormControl>
        <FormControl maxW={40}>
          <FormLabel>After</FormLabel>
          <NumberInput value={state.after} onChange={setAfter}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>stitches</FormHelperText>
        </FormControl>
      </HStack>

      <Box alignSelf="center">
        <svg viewBox="0 0 102 102" width={102} height={102}>
          <rect
            width={aspectAfter}
            height={30}
            x={offsetAfter}
            y={1}
            stroke="black"
            strokeWidth={1}
            fill="transparent"
          ></rect>
          <g
            transform={`translate(${
              Math.max(aspectAfter, aspectBefore) / 2 - 10
            } 17)`}
          >
            <polygon points="10,0 20,10 15,10 15,20 5,20 5,10 0,10" />
          </g>
          <rect
            width={aspectBefore}
            height={30}
            x={offsetBefore}
            y={31}
            stroke="black"
            strokeWidth={1}
            fill="transparent"
          ></rect>
        </svg>
      </Box>

      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Working
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              {state.after} - {state.before} = {change} st change
            </Text>
            <Text>
              {state.before} &divide; abs({change}) sts ={" "}
              {state.before / Math.abs(change)} sts &asymp; every {changeRepeat}{" "}
              sts (truncated) (note: we want the{" "}
              {state.after > state.before ? "increase" : "decrease"} in the
              middle of this group)
            </Text>
            <Text>
              {state.before} - (abs({change}) &times; {changeRepeat}) =
              remainder {remainder} sts
            </Text>
            <Text>
              ({changeRepeat} &divide; 2) + ({remainder} &divide; 2) ={" "}
              {changeRepeat / 2 + remainder / 2} &asymp; {start} (truncated) sts
              before first decrease
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Words
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className={style.steps}>
              {start > 0 && <li>work {start} stitches as usual</li>}
              <li>
                {state.before > state.after ? "decrease" : "increase"}, and then{" "}
                {state.before > state.after ? "decrease" : "increase"} every{" "}
                {changeRepeat} stitches {Math.abs(change) - 1} times (
                {Math.abs(change)} total)
              </li>
              <li>work as usual to end of row ({end} stitches)</li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Diagram
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <svg viewBox={`0 0 ${svgWidth} 50`} width={svgWidth} height="50">
              <defs>
                <polygon
                  id="stitch"
                  points="0,0 4,0 4,20 0,20"
                  strokeWidth={0}
                  fill="black"
                />
                <polygon id="dec" points="0,20 10,0 20,20 16,20 10,8 4,20" />
                <polygon id="inc" points="0,0 10,20 20,0 16,0 10,13 4,0" />
              </defs>
              <text y={15} x={start * 10 + changeRepeat * 5 + 18}>
                &times; {Math.abs(change) - 1}
              </text>
              <polyline
                points={`${start * 10 + 19},30 ${start * 10 + 19},20  ${
                  start * 10 + changeRepeat * 10 + 38
                },20 ${start * 10 + changeRepeat * 10 + 38},30 `}
                fill="none"
                stroke="black"
                strokeWidth={1}
              ></polyline>

              {startStiches.map((_, i) => (
                <use href="#stitch" x={i * 10} y={25} key={i} />
              ))}
              <use
                href={state.after > state.before ? "#inc" : "#dec"}
                x={start * 9}
                y={25}
              />
              {patternStitches.map((_, i) => (
                <use
                  href="#stitch"
                  x={start * 10 + 21 + i * 10}
                  y={25}
                  key={i}
                />
              ))}
              <use
                href={state.after > state.before ? "#inc" : "#dec"}
                x={start * 10 + changeRepeat * 10 + 17}
                y={25}
              />
              {endStitches.map((_, i) => (
                <use
                  href="#stitch"
                  x={start * 10 + changeRepeat * 10 + 40 + i * 10}
                  y={25}
                  key={i}
                />
              ))}
            </svg>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}
