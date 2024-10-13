import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
} from "@chakra-ui/react";
import { RaglanState } from "./state";

export const RaglanTable = ({
  frontChest,
  state,
  shelf,
  bodySlopeWidth,
  neckSlopeWidth,
  sleeveSlopeWidth,
  shoulderToArmpit,
  neckSlopeHeight,
  backCastOff,
  neckCastOff,
  sleeveCastOff,
}: {
  frontChest: number;
  state: RaglanState;
  shelf: number;
  bodySlopeWidth: number;
  neckSlopeWidth: number;
  sleeveSlopeWidth: number;
  shoulderToArmpit: number;
  neckSlopeHeight: number;
  backCastOff: number;
  neckCastOff: number;
  sleeveCastOff: number;
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Dimension</Th>
            <Th isNumeric>Back</Th>
            <Th isNumeric>Front neck</Th>
            <Th isNumeric>Sleeve</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>Bottom width</Th>
            <Td isNumeric>{frontChest.toLocaleString()}</Td>
            <Td></Td>
            <Td isNumeric>{state.sleeve.width.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Sleeve max width</Th>
            <Td></Td>
            <Td></Td>
            <Td isNumeric>{state.sleeve.bicep.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Body length</Th>
            <Td isNumeric>{state.underarm.toLocaleString()}</Td>
            <Td></Td>
            <Td isNumeric>{state.sleeve.length.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Shelf</Th>
            <Td isNumeric>{shelf.toLocaleString()}</Td>
            <Td isNumeric>{shelf.toLocaleString()}</Td>
            <Td isNumeric>{shelf.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Slope width</Th>
            <Td isNumeric>{bodySlopeWidth.toLocaleString()}</Td>
            <Td isNumeric>{neckSlopeWidth.toLocaleString()}</Td>
            <Td isNumeric>{sleeveSlopeWidth.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Slope length</Th>
            <Td isNumeric>{shoulderToArmpit.toLocaleString()}</Td>
            <Td isNumeric>{neckSlopeHeight.toLocaleString()}</Td>
            <Td isNumeric>{shoulderToArmpit.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Cast off</Th>
            <Td isNumeric>{backCastOff.toLocaleString()}</Td>
            <Td isNumeric>{neckCastOff.toLocaleString()}</Td>
            <Td isNumeric>{sleeveCastOff.toLocaleString()}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
