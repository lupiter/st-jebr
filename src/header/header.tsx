import "./header.module.css";
import { ROUTES } from "../routes";
import { NavLink } from "react-router-dom";
import {
  Heading,
  Text,
  Link,
  Flex,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";

export function Header() {
  return (
    <VStack>
      <Grid gap={3} templateColumns="repeat(3, 1fr)" alignItems="center">
        <GridItem justifySelf="end">
          <img src="/st-jebr/logo.svg" alt="" width={30} height={30} />
        </GridItem>

        <GridItem>
          <Heading textAlign="center" color="brand.200">
            st-jebr
          </Heading>
        </GridItem>
        <GridItem alignSelf="end">
          <Text
            role="caption"
            className="caption"
            align="left"
            color="gray.400"
          >
            stitch-(al)gebra
          </Text>
        </GridItem>
      </Grid>
      <Flex as="nav" direction="row" justify="space-around">
        <Flex as="ul" direction="row" justify="space-around" gap={2}>
          <li>
            <Link
              as={NavLink}
              to={ROUTES.HOME.toString()}
              _activeLink={{ textDecoration: "underline" }}
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              as={NavLink}
              to={ROUTES.CARD.toString()}
              _activeLink={{ textDecoration: "underline" }}
            >
              Punch cards
            </Link>
          </li>
        </Flex>
      </Flex>
    </VStack>
  );
}
