import {
  Button,
  Heading,
  VStack,
  Text,
  List,
} from "@chakra-ui/react";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../components/ui/dialog";
import { DialogTrigger } from "../components/ui/dialog";

export function RadarHelp() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Help?</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <Heading size="md">Radar Help</Heading>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <VStack align="stretch">
            <Heading size="sm">What?</Heading>
            <Text>
              Step through a shape to knit or crochet it, at a given size, based
              on your tension.
            </Text>
            <Heading size="sm">Images</Heading>
            <Text>
              The image can be any size, but the proportions need to be correct.
              That means it can be a photo, scan, or a drawing, but it should be
              to scale, like a sewing pattern piece. Check the height and the
              width are proprtioned correctly, and any photos should be
              completely flat.
            </Text>
            <Heading size="sm">Using</Heading>
            <Text>
              Controlls are as follows:
              <List.Root>
                <List.Item>
                  Next Row (any of):
                  <List.Root>
                    <List.Item>
                      Regular keyboard: ↓ → . ' ] spacebar s d ⏎ 2 6 3
                    </List.Item>
                    <List.Item>
                      Game controller: down, right, a, R1, R2
                    </List.Item>
                    <List.Item>Touch/Mouse: "Next" button</List.Item>
                  </List.Root>
                </List.Item>
                <List.Item>
                  Previous Row (any of):
                  <List.Root>
                    <List.Item>
                      Regular keyboard: ↑ ← , ; [ b v a w ⇧ 4 7 8
                    </List.Item>
                    <List.Item>Game controller: up, left, b, L1, L2</List.Item>
                    <List.Item>Touch/Mouse: "Prev" button</List.Item>
                  </List.Root>
                </List.Item>
              </List.Root>
            </Text>
            <Heading size="sm">Privacy</Heading>
            <Text>
              Images are not stored or transmitted in any way - it's all done in
              your browser.
            </Text>
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
