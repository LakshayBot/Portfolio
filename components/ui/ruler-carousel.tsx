"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  id: number;
  title: string;
}

// Create infinite items by triplicating the array
const createInfiniteItems = (originalItems: CarouselItem[]) => {
  const items: (CarouselItem & { originalIndex: number })[] = [];
  for (let i = 0; i < 3; i++) {
    originalItems.forEach((item, index) => {
      items.push({
        ...item,
        id: Number(`${i}${item.id}`),
        originalIndex: index,
      });
    });
  }
  return items;
};

const RulerLines = ({
  top = true,
  totalLines = 100,
}: {
  top?: boolean;
  totalLines?: number;
}) => {
  const lines = [];
  const lineSpacing = 100 / (totalLines - 1);

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isCenter = i === Math.floor(totalLines / 2);

    let height = "h-3";
    let color = "bg-gray-500 dark:bg-gray-400";

    if (isCenter) {
      height = "h-8";
      color = "bg-[var(--color-md-primary-fixed)]";
    } else if (isFifth) {
      height = "h-4";
      color = "bg-[var(--color-md-primary-fixed)]";
    }

    const positionClass = top ? "" : "bottom-0";

    lines.push(
      <div
        key={i}
        className={`absolute w-0.5 ${height} ${color} ${positionClass}`}
        style={{ left: `${i * lineSpacing}%` }}
      />
    );
  }

  return <div className="relative w-full h-8 px-4">{lines}</div>;
};

export function RulerCarousel({
  originalItems,
  onActiveChange,
}: {
  originalItems: CarouselItem[];
  onActiveChange?: (item: CarouselItem) => void;
}) {
  const infiniteItems = createInfiniteItems(originalItems);
  const itemsPerSet = originalItems.length;

  // Start with the middle set, first item
  const [activeIndex, setActiveIndex] = useState(itemsPerSet + 0);
  const [isResetting, setIsResetting] = useState(false);

  const handleItemClick = (newIndex: number) => {
    if (isResetting) return;

    const targetOriginalIndex = newIndex % itemsPerSet;
    const possibleIndices = [
      targetOriginalIndex,
      targetOriginalIndex + itemsPerSet,
      targetOriginalIndex + itemsPerSet * 2,
    ];

    let closestIndex = possibleIndices[0];
    let smallestDistance = Math.abs(possibleIndices[0] - activeIndex);

    for (const index of possibleIndices) {
      const distance = Math.abs(index - activeIndex);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    }

    setActiveIndex(closestIndex);
  };

  const handlePrevious = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev + 1);
  };

  // Handle infinite scrolling
  useEffect(() => {
    if (isResetting) return;

    if (activeIndex < itemsPerSet) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex + itemsPerSet);
        setIsResetting(false);
      }, 0);
    } else if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex - itemsPerSet);
        setIsResetting(false);
      }, 0);
    }
  }, [activeIndex, itemsPerSet, isResetting]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isResetting) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((prev) => prev - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResetting]);

  // Calculate target position - center the active item
  const itemIndexInSet = activeIndex % itemsPerSet;
  const centerSlot = 0; // we want slot 0 centered
  const itemWidth = 400 + 100; // 400px width + 100px gap
  const targetX = -(itemIndexInSet - centerSlot) * itemWidth;

  // Notify parent of active item change
  useEffect(() => {
    const idx = activeIndex % itemsPerSet;
    onActiveChange?.(originalItems[idx]);
  }, [activeIndex, itemsPerSet, originalItems, onActiveChange]);

  // Get current page info
  const currentPage = itemIndexInSet + 1;
  const totalPages = itemsPerSet;

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="w-full flex flex-col justify-center relative">
        {/* Top ruler lines */}
        <div className="flex items-center justify-center">
          <RulerLines top />
        </div>

        {/* Carousel track */}
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
          <motion.div
            className="flex items-center gap-[100px]"
            animate={{ x: targetX }}
            transition={
              isResetting
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 1,
                  }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(index)}
                  className="text-4xl md:text-6xl font-bold whitespace-nowrap cursor-pointer flex items-center justify-center"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    width: "400px",
                    color: isActive
                      ? "var(--color-md-primary-fixed)"
                      : "var(--color-md-on-surface-variant)",
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={
                    isResetting
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }
                  }
                >
                  {item.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom ruler lines */}
        <div className="flex items-center justify-center">
          <RulerLines top={false} />
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrevious}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Previous item"
        >
          <ChevronLeft
            className="w-5 h-5"
            style={{ color: "var(--color-md-primary-fixed)", opacity: 0.8 }}
          />
        </button>

        <div className="flex items-center gap-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            {String(currentPage).padStart(2, "0")}
          </span>
          <span className="text-sm" style={{ color: "var(--color-md-on-surface-variant)", opacity: 0.4 }}>
            /
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            {String(totalPages).padStart(2, "0")}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Next item"
        >
          <ChevronRight
            className="w-5 h-5"
            style={{ color: "var(--color-md-primary-fixed)", opacity: 0.8 }}
          />
        </button>
      </div>
    </div>
  );
}
