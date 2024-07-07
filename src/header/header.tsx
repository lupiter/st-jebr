import "./header.module.css";
import { ROUTES } from "../routes";
import { NavLink } from "react-router-dom";
import {
  Heading,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";

export function Header() {
  return (
    <HStack
      align="baseline"
      borderBottom="1px"
      borderBottomColor="gray.200"
      padding={2}
      paddingBottom={1}
      justifyContent="start"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Apps"
          icon={
            <img src="/st-jebr/logo.svg" alt="Menu" width={30} height={30} />
          }
        ></MenuButton>
        <MenuList>
          <MenuItem
            as={NavLink}
            to={ROUTES.HOME.toString()}
            _activeLink={{ textDecoration: "underline" }}
          >
            Calculator
          </MenuItem>
          <MenuItem
            as={NavLink}
            to={ROUTES.CARD.toString()}
            _activeLink={{ textDecoration: "underline" }}
          >
            Punch cards
          </MenuItem>
          <MenuItem
            as={NavLink}
            to={ROUTES.RADAR.toString()}
            _activeLink={{ textDecoration: "underline" }}
          >
            Radar
          </MenuItem>
        </MenuList>
      </Menu>
      <Heading textAlign="center" color="brand.200">
        st-jebr
      </Heading>
      <Text role="caption" className="caption" align="left" color="gray.400">
        stitch-(al)gebra
      </Text>
    </HStack>
  );
}
