import {
  VStack,
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import style from "./shapes.module.css";

export type ResultsPrams = {
  title: string;
  working: JSX.Element;
  words: JSX.Element;
  diagram: JSX.Element;
};

export function Results(props: ResultsPrams): JSX.Element {
  const { title, working, words, diagram } = props;
  return (
    <VStack as="article" align="stretch">
      <Heading size="sm">{title}</Heading>
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
          <AccordionPanel pb={4}>{working}</AccordionPanel>
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
            <ul className={style.steps}>{words}</ul>
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
          <AccordionPanel pb={4}>{diagram}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}
