import {
  HStack,
  Input,
  Button,
  Heading,
  Fieldset,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { Field } from "../components/ui/field";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../components/ui/dialog";

export type ImageState = {
  width: number;
  height: number;
  url: string;
};

export function FileModal(props: { onchange: (image?: ImageState) => void }) {
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

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button>File</Button>
      </DialogTrigger>

      <DialogBackdrop />

      <DialogContent>
        <DialogHeader>
          <Heading size="md">File</Heading>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody as="form">
          <HStack justify={"start"} align={"end"}>
            <Field label="Image">
              <Fieldset.Root>
                <Input
                  type="file"
                  onChange={fileChange}
                  accept="image/*"
                  border="none"
                  paddingInlineStart={0}
                />
              </Fieldset.Root>
            </Field>
          </HStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
