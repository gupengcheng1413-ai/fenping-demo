import { useEffect, useRef, useState } from "react";
import ShouyeHistory from "../imports/ShouyeHistory/ShouyeHistory";
import HanziShanFenping from "../imports/HanziShanFenping-1-1/HanziShanFenping-23-1198";
import HanziShanBufenping from "../imports/HanziShanBufenping-1/HanziShanBufenping";
import HanziHe from "../imports/HanziHe-1/HanziHe";
import CiyuMeili from "../imports/CiyuMeili/CiyuMeili";
import CiyuZhaoyang from "../imports/CiyuZhaoyang/CiyuZhaoyang";
import XiehouyuShort from "../imports/XiehouyuShort/XiehouyuShort";
import XiehouyuLong from "../imports/XiehouyuLong-1/XiehouyuLong-26-3511";
import PoemJingyesi from "../imports/PoemJingyesi/PoemJingyesi";
import ShijuShort from "../imports/ShijuShort/ShijuShort";
import ShijuLong from "../imports/ShijuLong/ShijuLong";
import ShijuLongHouxuan from "../imports/ShijuLongHouxuan/ShijuLongHouxuan";
import WordPresent from "../imports/WordPresent-1/WordPresent-32-740";
import Longword from "../imports/Longword-2/Longword";
import Duanyu from "../imports/Duanyu/Duanyu";
import PinyinWordA from "../imports/PinyinWordA-1/PinyinWordA-42-460";
import PinyinHao from "../imports/PinyinHao-1/PinyinHao";
import PinyinFanyiZhuang from "../imports/PinyinFanyiZhuang-1/PinyinFanyiZhuang-53-607";
import WordPresen from "../imports/WordPresen/WordPresen";
import PinyinMeili from "../imports/PinyinMeili/PinyinMeili";
import EnsentenceShortFenping from "../imports/EnsentenceShortFenping/EnsentenceShortFenping";
import CnsentenceFenping from "../imports/CnsentenceFenping/CnsentenceFenping";
import EnsentenceFenping from "./components/ensentence-fenping";
import EnsentenceBufenping from "./components/ensentence-bufenping";
import { HistoryOverlay } from "./components/history-overlay";
import { PlaceholderFrame } from "./components/placeholder-frame";

export type FrameId =
  | "history"
  | "hanzi-shan-fenping"
  | "hanzi-shan-bufenping"
  | "hanzi-he"
  | "ciyu-meili"
  | "ciyu-zhaoyang"
  | "xiehouyu-short"
  | "xiehouyu-long"
  | "poem-jingyesi"
  | "shiju-short"
  | "shiju-long"
  | "shiju-long-houxuan"
  | "word-present"
  | "longword"
  | "word-presen"
  | "duanyu"
  | "pinyin+word-a"
  | "pinyin-hao"
  | "pinyin+fanyi-zhuang"
  | "pinyin-meili"
  | "ensentence-short-fenping"
  | "ensentence-fenping"
  | "ensentence-bufenping"
  | "cnsentence-fenping";

const VIEW_W = 1640;
const VIEW_H = 348;

const FRAME_SIZES: Partial<
  Record<FrameId, { w: number; h: number; leftFixed?: number; rightFixed?: number; leftFixedContentH?: number }>
> = {
  history: { w: 1640, h: 1116 },
  "hanzi-shan-fenping": { w: 1640, h: 7600, leftFixed: 460, rightFixed: 75 },
  "hanzi-shan-bufenping": { w: 1640, h: 6500, rightFixed: 75 },
  "hanzi-he": { w: 1640, h: 5166, leftFixed: 460, rightFixed: 75 },
  "ciyu-meili": { w: 1640, h: 2470, leftFixed: 195, rightFixed: 75 },
  "ciyu-zhaoyang": { w: 1640, h: 2009, leftFixed: 196, rightFixed: 75 },
  "xiehouyu-short": { w: 1640, h: 671, leftFixed: 475, rightFixed: 75 },
  "xiehouyu-long": { w: 1640, h: 665, leftFixed: 475, rightFixed: 75, leftFixedContentH: 665 },
  "poem-jingyesi": { w: 1640, h: 2974, leftFixed: 256, rightFixed: 75 },
  "shiju-short": { w: 1640, h: 920, leftFixed: 375, rightFixed: 75 },
  "shiju-long": { w: 1640, h: 2335, leftFixed: 482, rightFixed: 75, leftFixedContentH: 425 },
  "shiju-long-houxuan": { w: 1640, h: 660, leftFixed: 482, rightFixed: 75, leftFixedContentH: 420 },
  "word-present": { w: 1640, h: 9140, leftFixed: 475, rightFixed: 75 },
  "word-presen": { w: 1640, h: 608, leftFixed: 250, rightFixed: 75 },
  "longword": { w: 1640, h: 348, leftFixed: 475, rightFixed: 75 },
  "duanyu": { w: 1640, h: 348, leftFixed: 475, rightFixed: 75 },
  "pinyin+word-a": { w: 1640, h: 4210, rightFixed: 75 },
  "pinyin-hao": { w: 1640, h: 348, rightFixed: 75 },
  "pinyin+fanyi-zhuang": { w: 1640, h: 727, rightFixed: 75 },
  "pinyin-meili": { w: 1640, h: 348, rightFixed: 75 },
  "ensentence-short-fenping": { w: 1640, h: 348, rightFixed: 75 },
  "cnsentence-fenping": { w: 1640, h: 348, rightFixed: 75 },
  "ensentence-fenping": { w: 1640, h: 348 },
  "ensentence-bufenping": { w: 1640, h: 348 },
};

export default function App() {
  const [frame, setFrame] = useState<FrameId>("history");
  const back = () => setFrame("history");
  const historyScrollRef = useRef(0);
  const scrollElRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  // 响应式缩放：确保 1640×348 的视口完全适应屏幕
  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // 计算缩放比例，让 1640×348 的视口完全适应屏幕
      const scaleX = windowWidth / VIEW_W;
      const scaleY = windowHeight / VIEW_H;

      // 使用较小的缩放比例，确保整个 1640×348 视口都能显示
      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (frame === "history" && scrollElRef.current) {
      scrollElRef.current.scrollTop = historyScrollRef.current;
    }
  }, [frame]);

  const renderFrame = () => {
    switch (frame) {
      case "history":
        return (
          <>
            <ShouyeHistory />
            <HistoryOverlay onNavigate={setFrame} canvasWidth={1640} canvasHeight={1116} />
          </>
        );
      case "hanzi-shan-fenping":
        return <HanziShanFenping />;
      case "hanzi-shan-bufenping":
        return <HanziShanBufenping />;
      case "hanzi-he":
        return <HanziHe />;
      case "ciyu-meili":
        return <CiyuMeili />;
      case "ciyu-zhaoyang":
        return <CiyuZhaoyang />;
      case "xiehouyu-short":
        return <XiehouyuShort />;
      case "xiehouyu-long":
        return <XiehouyuLong />;
      case "poem-jingyesi":
        return <PoemJingyesi />;
      case "shiju-short":
        return <ShijuShort />;
      case "shiju-long":
        return <ShijuLong />;
      case "shiju-long-houxuan":
        return <ShijuLongHouxuan />;
      case "word-present":
        return <WordPresent />;
      case "word-presen":
        return <WordPresen />;
      case "longword":
        return <Longword />;
      case "duanyu":
        return <Duanyu />;
      case "pinyin+word-a":
        return <PinyinWordA />;
      case "pinyin-hao":
        return <PinyinHao />;
      case "pinyin+fanyi-zhuang":
        return <PinyinFanyiZhuang />;
      case "pinyin-meili":
        return <PinyinMeili />;
      case "ensentence-short-fenping":
        return <EnsentenceShortFenping />;
      case "cnsentence-fenping":
        return <CnsentenceFenping />;
      case "ensentence-fenping":
        return <EnsentenceFenping onToggleMode={() => setFrame("ensentence-bufenping")} />;
      case "ensentence-bufenping":
        return <EnsentenceBufenping onToggleMode={() => setFrame("ensentence-fenping")} />;
      default:
        return null;
    }
  };

  const size = FRAME_SIZES[frame];

  return (
    <div className="bg-black min-h-screen w-full flex items-center justify-center">
      <div
        className="relative bg-black overflow-hidden shadow-2xl"
        style={{
          width: VIEW_W * scale,
          height: VIEW_H * scale,
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: VIEW_W,
            height: VIEW_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        >
        {size ? (
          <>
            <div
              key={frame + "-scroll"}
              ref={(el) => {
                if (frame === "history") scrollElRef.current = el;
              }}
              onScroll={
                frame === "history"
                  ? (e) => {
                      historyScrollRef.current = (e.currentTarget as HTMLDivElement).scrollTop;
                    }
                  : undefined
              }
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={{ width: VIEW_W, height: VIEW_H }}
            >
              <div className="relative" style={{ width: size.w, height: size.h }}>
                {renderFrame()}
              </div>
            </div>
            {size.leftFixed && (() => {
              const contentH = size.leftFixedContentH ?? VIEW_H;
              const scrollable = contentH > VIEW_H;
              return (
                <div
                  className={
                    scrollable
                      ? "absolute top-0 left-0 overflow-y-auto overflow-x-hidden z-40"
                      : "absolute top-0 left-0 overflow-hidden pointer-events-none z-40"
                  }
                  style={{
                    width: size.leftFixed,
                    height: VIEW_H,
                    ...(scrollable
                      ? { touchAction: "pan-y", overscrollBehavior: "contain" }
                      : {}),
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ width: size.leftFixed, height: contentH }}
                  >
                    <div
                      className="absolute top-0 left-0"
                      style={{ width: size.w, height: size.h }}
                    >
                      {renderFrame()}
                    </div>
                  </div>
                </div>
              );
            })()}
            {size.rightFixed && (
              <div
                className="absolute top-0 right-0 overflow-hidden pointer-events-none z-40"
                style={{ width: size.rightFixed, height: VIEW_H }}
              >
                <div
                  className="relative"
                  style={{
                    width: size.w,
                    height: size.h,
                    marginLeft: -(size.w - size.rightFixed),
                  }}
                >
                  {renderFrame()}
                </div>
              </div>
            )}
          </>
        ) : (
          <PlaceholderFrame frameId={frame} onBack={back} />
        )}

        {frame !== "history" && (
          <button
            onClick={back}
            aria-label="返回"
            className="absolute top-0 left-0 h-full w-[50px] z-50 flex items-start justify-start pt-2 pl-2 cursor-pointer bg-gradient-to-r from-black/30 to-transparent hover:from-black/50"
          >
            <span className="text-white text-[20px]">‹</span>
          </button>
        )}

        {(frame === "hanzi-shan-fenping" || frame === "hanzi-shan-bufenping") && (
          <button
            onClick={() =>
              setFrame(frame === "hanzi-shan-fenping" ? "hanzi-shan-bufenping" : "hanzi-shan-fenping")
            }
            aria-label="全/双屏切换"
            className="absolute z-50 cursor-pointer hover:bg-white/10 active:bg-white/20 rounded-md"
            style={{ left: 1580, top: 180, width: 52, height: 52 }}
          />
        )}
        </div>
      </div>
    </div>
  );
}
