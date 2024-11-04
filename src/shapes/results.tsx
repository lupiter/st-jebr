import {
  VStack,
  Box,
  Heading,
  AccordionItem,
  AccordionRoot,
} from "@chakra-ui/react";
import style from "./shapes.module.css";
import {
  AccordionItemContent,
  AccordionItemTrigger,
} from "../components/ui/accordion";

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
      <AccordionRoot multiple>
        <AccordionItem value="working">
          <h2>
            <AccordionItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                Working
              </Box>
            </AccordionItemTrigger>
          </h2>
          <AccordionItemContent pb={4}>{working}</AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="words">
          <h2>
            <AccordionItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                Words
              </Box>
            </AccordionItemTrigger>
          </h2>
          <AccordionItemContent pb={4}>
            <ul className={style.steps}>{words}</ul>
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem value="diagram">
          <h2>
            <AccordionItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                Diagram
              </Box>
            </AccordionItemTrigger>
          </h2>
          <AccordionItemContent pb={4}>{diagram}</AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
}
