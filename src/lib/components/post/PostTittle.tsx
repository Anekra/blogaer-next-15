import Image from "next/image";
import React from "react";
import { RenderElementProps } from "slate-react";

export default function PostTittle({
  props,
  text,
  tags,
  viewOnly
}: {
  props: RenderElementProps;
  text: string;
  tags?: string[];
  viewOnly?: boolean;
}) {
  const { children, element, attributes } = props;
  return (
    <React.Fragment>
      <h1
        {...attributes}
        className={`text-5xl font-bold ${element.headingSize} ${element.align}${
          !text && !viewOnly ? " ph relative" : ""
        }${tags ? " mb-4" : ""}`}
      >
        {children}
      </h1>
      {viewOnly && (
        <div data-slate-void className="mb-6 flex flex-col gap-2">
          <div className="flex h-8 justify-end gap-2">
            {tags?.map((tag, i) => (
              <span key={i} className="tags">
                <p>{tag}</p>
              </span>
            ))}
          </div>
          <div className="[&>*]:tooltip flex items-center gap-4 [&>*]:flex [&>*]:items-center [&>*]:gap-1">
            <div data-text="Comments">
              <Image
                src="/like_it.svg"
                alt="Like it thought icon"
                width={50}
                height={50}
                priority
                className="flex items-center justify-center [&>*]:size-6"
              />
              <p>0</p>
            </div>
            <div data-text="Reads">
              <Image
                src="/love_it.svg"
                alt="Love it thought icon"
                width={50}
                height={50}
                priority
                className="flex items-center justify-center [&>*]:size-6"
              />
              <p>0</p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
