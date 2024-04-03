import { ChangeEvent, useState } from "react";
import "./card.css";
import { Header } from "../header/header";
import { UNIT } from "../app-state";
import { FairIsle } from "./fair-isle/fair-isle";
import { chunk } from "./measurements";

type LoadingErrorState = {
  message: string;
};

type PixelDataState = {
  pixels: number[][];
  width: number;
  url: string;
};

type CardState = {
  maxWidth?: number;
  maxHeight?: number;
  unit: UNIT;
  content?: LoadingErrorState | PixelDataState;
};

function isDataState(
  content: LoadingErrorState | PixelDataState
): content is PixelDataState {
  return (content as PixelDataState).pixels !== undefined;
}

function isErrorState(
  content: LoadingErrorState | PixelDataState
): content is LoadingErrorState {
  return (content as LoadingErrorState).message !== undefined;
}

export function Card() {
  const [state, setState] = useState<CardState>({
    maxWidth: 21,
    maxHeight: 60,
    unit: UNIT.CM,
  });

  const setMaxHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const float = parseFloat(e.target.value);
    setState({ ...state, maxHeight: Number.isNaN(float) ? undefined : float});
  };

  // const setMaxWidth = (e: ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, maxWidth: parseFloat(e.target.value) });
  // };

  const setUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      unit: e.target.value === UNIT.CM.toString() ? UNIT.CM : UNIT.IN,
    });
  };

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      setState({ ...state, content: undefined });
      return;
    }
    const file = files[0];
    const bitmap = await createImageBitmap(file);
    const url = await URL.createObjectURL(file);
    const width = bitmap.width;
    const height = bitmap.height;
    if (width > 200 || height > 200) {
      setState({
        ...state,
        content: {
          message: `That image is ${width}x${height}px which is a bit large for a knitting project and won't generate good cards. Consider resizing it, or choosing another.`,
        },
      });
      return;
    }
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(bitmap, 0, 0);
    const data = ctx?.getImageData(0, 0, width, height).data;
    if (!data) {
      setState({
        ...state,
        content: { message: "Sorry, we had trouble reading that image." },
      });
      return;
    }
    const pixels = chunk(Array.from(data), 4);

    setState({ ...state, content: { pixels, width, url } });
  };

  let maxHeightMM = state.maxHeight ? state.maxHeight * 10 : undefined;
  if (state.unit === UNIT.IN && state.maxHeight) {
    maxHeightMM = state.maxHeight * 25.4;
  }

  return (
    <>
      <Header />
      <section>
        <form>
          <fieldset>
            <legend>Maximum page size</legend>
            {/* <label>
              <input
                type="number"
                value={state.maxWidth}
                onChange={setMaxWidth}
              />{" "}
              width
            </label> */}
            <label>
              <input
                type="number"
                value={state.maxHeight}
                onChange={setMaxHeight}
              />{" "}
              height
            </label>
            <select
              value={state.unit.toString()}
              onChange={setUnit}
              aria-label="units"
            >
              <option value="cm">cm</option>
              <option value="in">inch</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Image</legend>
            <input type="file" onChange={fileChange} accept="image/*" />
            {state.content && isDataState(state.content) && (
              <img
                src={state.content.url}
                style={{width: `${1.333 * state.content.width * 3}px`, height: `${state.content.pixels.length / state.content.width * 3}px`}}
                title="your image, as it would appear knitted"
              />
            )}
          </fieldset>
        </form>
      </section>
      <aside>
        <p>
          Generate punchcards for Brother knitting machines that can be cut with
          a cutting machine e.g. silhouette, cricut, etc.
        </p>
        <p>
          The image should have the height and width in pixels that you want in
          stitches. That means to make a card 24 st wide and 60 rows long, you
          want to upload a 24x60 pixel image. These can be made using the image
          editor of your choice. Images are not stored or transmitted in any way
          - it's all done in your browser.
        </p>
      </aside>

      {state.content && isErrorState(state.content) && (
        <p className="error">🛑 {state.content.message}</p>
      )}

      {state.content && isDataState(state.content) && (
        <FairIsle
          data={state.content.pixels}
          width={state.content.width}
          maxHeight={maxHeightMM}
        />
      )}
    </>
  );
}
