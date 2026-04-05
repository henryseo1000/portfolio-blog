"use client";

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ArrowLeft from "../../../public/svg/arrowLeft.svg"

interface Heading {
    level: number;
    text: string;
    id: string;
}

function AnchorNav() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [minimize, setMinimize] = useState<boolean>(false);
    const [viewHeadings, setViewHeadings] = useState<{
      view: Heading[];
      keep: boolean;
    }>({ view: [], keep: false });
    const [timerId, setTimerId] = useState<NodeJS.Timeout[]>([]);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const anchorRef = useRef<HTMLDivElement>(null);

    const generateIdFromText = (text: string) => {
      return text.replace(/\s+/g, '-').toLowerCase();
    };

    const createHeadings = (allHeadings: NodeListOf<Element>) => {
      const newHeadings: Heading[] = Array.from(allHeadings).map(
        (heading: Element, index) => {
          let innerText = '';
          const element = heading as HTMLElement;
          const id = generateIdFromText(element.innerText + '-' + index);
          element.setAttribute('id', id);

          if (Number(element.localName.slice(1)) === 2) {
            innerText = ' ' + element.innerText;
          }
          else if (Number(element.localName.slice(1)) === 3) {
            innerText = '  ' + element.innerText;
          }
          else {
            innerText = element.innerText;
          }

          return {
            level: Number(element.localName.slice(1)),
            text: innerText,
            id,
          };
        },
      );

      return newHeadings;
    };

    const viewHeading = viewHeadings.view.reduce(
      (acc, heading) => (acc.level <= heading.level ? acc : heading),
      { level: 7, text: '', id: '' },
    );

    const addViewHeadings = (newHeading: Heading) => {
      setViewHeadings(({ view, keep }) => {
        const exists = view.some(({ id }) => id === newHeading.id);

        if (!exists) {
          if (keep) {
            return { view: [{ ...newHeading }], keep: false };
          }
          return { view: [...view, { ...newHeading }], keep: false };
        }
        return { view, keep };
      });
    };

    const removeViewHeadings = (
      removeHeading: Heading,
      scrollDown: boolean,
      newHeadings: Heading[],
    ) => {
      setViewHeadings(({ view }) => {
        if (view.length > 1) {
          return {
            view: view.filter((heading) => heading.id !== removeHeading.id),
            keep: false,
          };
        } else {
          if (scrollDown) {
            return { view, keep: true };
          } else {
            const prevIndx =
              newHeadings.findIndex(({ id }) => id === view[0]?.id) - 1;
            return { view: [{ ...newHeadings[prevIndx] }], keep: true };
          }
        }
      });
    };

    const handleOut = () => {
      const id = setTimeout(() => {
        setMinimize(true);
      }, 4000);

      timerId.push(id);
    }

    const handleIn = () => {      
      clearAllTimeouts();
    }
    
    const clearAllTimeouts = () => {
      const len = timerId.length;

      for(let i = 0; i < len; i++) {
        clearTimeout(timerId[i]);
      }
    }

    useEffect(() => {
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const newHeadings = createHeadings(allHeadings);

      setViewHeadings({ view: [], keep: false });
      setHeadings(newHeadings);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const { target, isIntersecting, boundingClientRect, rootBounds } =
              entry;
            const heading = {
              level: Number(target.nodeName.slice(1)),
              id: target.id,
              text: (target as HTMLElement).innerText,
            };

            const isTopBoundaryExceeded =
              rootBounds && boundingClientRect.top < rootBounds.top;

            if (isIntersecting) {
              addViewHeadings(heading);
            } else {
              removeViewHeadings(heading, !!isTopBoundaryExceeded, newHeadings);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1,
        },
      );

      allHeadings.forEach((heading) => {
        observer.observe(heading);
      });

      return () => {
        allHeadings.forEach((heading) => {
          observer.unobserve(heading);
        });
      };
    }, [pathname]);

    useEffect(() => {
      if (window.location.hash) {
        const decodedHash = decodeURIComponent(window.location.hash);
        const element = document.getElementById(decodedHash.substring(1));

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, [searchParams]);

    useEffect(() => {
      
      handleOut();

      anchorRef?.current?.addEventListener('mousemove', handleIn);
      anchorRef?.current?.addEventListener('mouseleave', handleOut);

      return () => {
        anchorRef?.current?.removeEventListener('mousemove', handleIn);
        anchorRef?.current?.removeEventListener('mouseleave', handleOut);
      }
    },[ minimize ])

    if (!headings || headings.length === 0) {
      return <></>
    }

    return (
      <div 
        className={cn("flex flex-col fixed top-[30px] right-[30px] max-w-[200px] p-[15px] border-[1px] border-[#4C4C4C] rounded-[10px] bg-[#393939] duration-200 z-10 opacity-80 hover:opacity-100", minimize ? 'right-0 rounded-[10px_0px_0px_10px] hover:cursor-pointer' : "")}
        onClick={() => {
          if(minimize) {
            setMinimize(false);
          }
        }}
        ref={anchorRef}
      >
        {!minimize && headings.map(({ level: currentLevel, text, id }, index) => (
          <Link className={cn('w-full text-[#B3B3B3] text-[12px] focus:text-[#ffffff] hover:text-[#ffffff]', viewHeading?.id === id ? 'text-[#ffffff]' : '')} 
            href={`#${id}`} 
            scroll={false}
            replace
            key={id}
          >
            <pre className='w-full text-nowrap text-ellipsis overflow-hidden'>{text}</pre>
          </Link>
        ))}
        {minimize && <ArrowLeft/>}
      </div>
    );
}

export default AnchorNav;