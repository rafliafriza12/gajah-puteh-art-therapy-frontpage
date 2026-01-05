import RefreshIcon from "@/components/atoms/icons/RefreshIcon";
import { Heading4 } from "@/components/atoms/Typography";
import React from "react";

interface PageMenuContentContainerProps {
  title: string;
  id: string;
  refreshFunction: () => void;
  children: React.ReactNode;
}

const PageMenuContentContainer = (props: PageMenuContentContainerProps) => {
  return (
    <div id={props.id} className="w-full bg-white rounded-[20px] flex flex-col gap-6 p-4">
      <div className="w-full flex justify-between">
        <Heading4>{props.title}</Heading4>
        <button onClick={props.refreshFunction} className="rounded-lg border border-moss-stone hover:bg-grey-lightest duration-200 text-moss-stone w-8 h-8 flex items-center justify-center">
            <RefreshIcon/>
        </button>
      </div>
      {props.children}
    </div>
  );
};

export default PageMenuContentContainer;
