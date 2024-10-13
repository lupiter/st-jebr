import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
} from "@chakra-ui/react";
import { RaglanCalculations, RaglanState } from "./state";

export const RaglanTable = ({
  state,
  calculations: measures,
}: {
  state: RaglanState;
  calculations: RaglanCalculations;
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
            <Td isNumeric>{measures.frontChest.toLocaleString()}</Td>
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
            <Td isNumeric>{measures.shelf.toLocaleString()}</Td>
            <Td isNumeric>{measures.shelf.toLocaleString()}</Td>
            <Td isNumeric>{measures.shelf.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Slope width</Th>
            <Td isNumeric>{measures.bodySlopeWidth.toLocaleString()}</Td>
            <Td isNumeric>{measures.neckSlopeWidth.toLocaleString()}</Td>
            <Td isNumeric>{measures.sleeveSlopeWidth.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Slope length</Th>
            <Td isNumeric>{measures.shoulderToArmpit.toLocaleString()}</Td>
            <Td isNumeric>{measures.neckSlopeHeight.toLocaleString()}</Td>
            <Td isNumeric>{measures.shoulderToArmpit.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Th>Cast off</Th>
            <Td isNumeric>{measures.backCastOff.toLocaleString()}</Td>
            <Td isNumeric>{measures.neckCastOff.toLocaleString()}</Td>
            <Td isNumeric>{measures.sleeveCastOff.toLocaleString()}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
