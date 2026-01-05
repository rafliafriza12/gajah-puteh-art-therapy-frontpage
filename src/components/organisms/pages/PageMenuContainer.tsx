import { Heading3 } from "@/components/atoms/Typography";
import { smoothScrolltoSection } from "@/libs/utils";

export interface Section {
  title: string;
  id?: string;
}

interface PageMenuContainerProps {
  title: string;
  children?: React.ReactNode;
  sections: Section[];
}

const PageMenuContainer = (props: PageMenuContainerProps) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex justify-between items-center">
        <div>
          {/* BREADCRUMB DISINI */}
          <Heading3>{props.title}</Heading3>
        </div>
        <button className="px-4 py-2.5 bg-moss-stone text-neutral-01 rounded-lg text-base font-medium hover:bg-moss-stone/90 transition-colors">
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div className="flex flex-col gap-4 min-w-0">{props.children}</div>
        <div className="bg-white rounded-[20px] flex flex-col gap-4 p-4 w-80 sticky top-24 self-start">
          <p className="text-base font-medium">Sections</p>
          {props.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => smoothScrolltoSection(section.id || '#')}
              className="rounded-lg text-xs font-normal border border-grey-stroke py-3 px-2.5 text-start hover:bg-grey-lightest duration-200"
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageMenuContainer;
