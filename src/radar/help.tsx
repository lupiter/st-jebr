import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  VStack,
  UnorderedList,
  ListItem,
  ModalFooter,
  useDisclosure,
  Text,
  Box,
  FormLabel,
} from "@chakra-ui/react";

export function RadarHelp() {
  const {
    isOpen: helpIsOpen,
    onOpen: onHelpOpen,
    onClose: onHelpClose,
  } = useDisclosure();
  return (
    <Box>
      <Button onClick={onHelpOpen}>Help?</Button>

      <Modal isOpen={helpIsOpen} onClose={onHelpClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Radar Help</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2} align="stretch">
              <Heading size="sm">What?</Heading>
              <Text>
                Step through a shape to knit or crochet it, at a given size,
                based on your tension.
              </Text>
              <Heading size="sm">Images</Heading>
              <Text>
                The image can be any size, but the proportions need to be
                correct. That means it can be a photo, scan, or a drawing, but
                it should be to scale, like a sewing pattern piece. Check the
                height and the width are proprtioned correctly, and any photos
                should be completely flat.
              </Text>
              <Heading size="sm">Using</Heading>
              <Text>
                Controlls are as follows:
                <UnorderedList>
                  <ListItem>
                    Next Row (any of):
                    <UnorderedList>
                      <ListItem>
                        Regular keyboard: ↓ → . ' ] spacebar s d ⏎ 2 6 3
                      </ListItem>
                      <ListItem>
                        Game controller: down, right, a, R1, R2
                      </ListItem>
                      <ListItem>Touch/Mouse: "Next" button</ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    Previous Row (any of):
                    <UnorderedList>
                      <ListItem>
                        Regular keyboard: ↑ ← , ; [ b v a w ⇧ 4 7 8
                      </ListItem>
                      <ListItem>Game controller: up, left, b, L1, L2</ListItem>
                      <ListItem>Touch/Mouse: "Prev" button</ListItem>
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
              </Text>
              <Heading size="sm">Privacy</Heading>
              <Text>
                Images are not stored or transmitted in any way - it's all done
                in your browser.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
