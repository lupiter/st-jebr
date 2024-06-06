import {
  useDisclosure,
  HStack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

export type ImageState = {
  width: number;
  height: number;
  url: string;
};

export function FileModal(props: { onchange: (image?: ImageState) => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      props.onchange();
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.onload = async () => {
      const bitmap = await createImageBitmap(img);
      props.onchange({ url, width: bitmap.width, height: bitmap.height });
    };
    img.src = url;
  };

  const styles = useMultiStyleConfig("Button", { variant: "outline" });

  return (
    <Box>
      <Button onClick={onOpen}>File</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">File</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form">
            <HStack justify={"start"} align={"end"}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <InputGroup>
                  <Input
                    type="file"
                    onChange={fileChange}
                    accept="image/*"
                    border="none"
                    paddingInlineStart={0}
                    sx={{
                      "::file-selector-button": {
                        border: "none",
                        outline: "none",
                        mr: 2,
                        ...styles,
                      },
                    }}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
