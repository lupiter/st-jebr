import { Table, Text } from "@chakra-ui/react";
import { RaglanCalculations, RaglanState } from "./state";

export const RaglanTable = ({
  state,
  calculations: measures,
}: {
  state: RaglanState;
  calculations: RaglanCalculations;
}) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Dimension</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Back</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Front neck</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Sleeve</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.ColumnHeader>Bottom width</Table.ColumnHeader>
          <Table.Cell textAlign="end">
            {measures.frontChest.toLocaleString()}
          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell textAlign="end">
            {state.sleeve.bicep.toLocaleString()}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Body length</Table.ColumnHeader>
          <Table.Cell textAlign="end">
            {state.underarm.toLocaleString()}
          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell textAlign="end">
            {state.sleeve.length.toLocaleString()}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Shelf</Table.ColumnHeader>
          <Table.Cell textAlign="end">
            {measures.shelf.toLocaleString()}
          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell textAlign="end">
            {measures.shelf.toLocaleString()}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Slope width</Table.ColumnHeader>
          <Table.Cell textAlign="end">
            {measures.bodySlopeWidth.toLocaleString()}
          </Table.Cell>
          <Table.Cell textAlign="end">
            {measures.neckSlopeWidth.toLocaleString()}
          </Table.Cell>
          <Table.Cell textAlign="end">
            {measures.sleeveSlopeWidth.toLocaleString()}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Slope length</Table.ColumnHeader>
          <Table.Cell textAlign="end">
            {measures.bodySlopeHeight.toLocaleString()}
          </Table.Cell>
          <Table.Cell textAlign="end">
            {measures.neckSlopeHeight.toLocaleString()}
          </Table.Cell>
          <Table.Cell textAlign="end">
            {measures.sleeveSlopeHeight.toLocaleString()}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.ColumnHeader>Cast off</Table.ColumnHeader>
          <Table.Cell textAlign="end">
            {measures.backCastOff.toLocaleString()}
          </Table.Cell>
          <Table.Cell textAlign="end">
            {measures.neckCastOff.toLocaleString()}
          </Table.Cell>
          <Table.Cell textAlign="end">
            {measures.sleeveCastOff.toLocaleString()}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Caption>
        <Text>Sleeve slope is {measures.sleeveAngleRad.toLocaleString()} rad or {(measures.sleeveAngleRad / Math.PI * 180).toLocaleString()}º</Text>
      </Table.Caption>
    </Table.Root>
  );
};
