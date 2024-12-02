import { startRegistration } from "@simplewebauthn/browser";
import { nanoid } from "nanoid";
import {
  BaseSelection,
  Editor,
  Element,
  Path,
  Range,
  Transforms,
  Node
} from "slate";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import postClientFetch from "@/lib/actions/client/postClientFetch";
import { SearchParams, SlateEditor } from "@/lib/types/common";
import { CustomElement } from "@/lib/types/slate";
import { UrlSchema } from "@/lib/types/zodSchemas";
import { LIST_TYPES, VOIDS } from "@/lib/utils/constants";
import {
  HeadingSize,
  WysiwygAlign,
  WysiwygStyle,
  WysiwygType
} from "@/lib/utils/enums";

export function addElement(editor: SlateEditor, element: CustomElement) {
  const { selection } = editor;
  if (!selection || !selection.anchor) return;
  const nextPoint = editor.after(selection, { distance: 1, unit: "line" });
  Transforms.insertNodes(editor, element, { at: nextPoint, select: true });
}

export function addParagraph(editor: SlateEditor) {
  addElement(editor, {
    type: WysiwygType.Paragraph,
    children: [{ text: "" }],
    align: WysiwygAlign.Left
  });
  // focusEditor(editor);
}

export function addCodeEditor(editor: SlateEditor) {
  addElement(editor, {
    type: WysiwygType.Code,
    children: [{ text: "" }]
  });
  // focusEditor(editor);
}

export function addImageHolder(editor: SlateEditor) {
  addElement(editor, {
    type: WysiwygType.ImagePicker,
    children: [{ text: "" }]
  });
  // focusEditor(editor);
}

export function addDivider(editor: SlateEditor) {
  addElement(editor, {
    type: WysiwygType.Divider,
    children: [{ text: "" }]
  });
  // focusEditor(editor);
}

export function removeElement(editor: SlateEditor) {
  // focusEditor(editor);
  Transforms.removeNodes(editor);
}

export function getElement(editor: SlateEditor) {
  const { selection } = editor;
  if (!selection || !selection.anchor) return;
  const element = editor.children[selection.anchor.path[0]];
  return element as CustomElement;
}

export function getElementType(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.type;
}

export function getElementAlignment(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.align;
}

export function getElementHeadingSize(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.headingSize;
}

export function getLinkElement(editor: SlateEditor) {
  const linkElement = Editor.above(editor, {
    match: (n) => (n as CustomElement).type === WysiwygStyle.Link
  });
  return linkElement;
}

export function getPath(editor: SlateEditor, location: BaseSelection) {
  if (!location) return;
  return Editor.path(editor, location);
}

export function setCodeElement(editor: SlateEditor, value: string) {
  const { selection } = editor;
  if (!selection) return;

  Transforms.setNodes(editor, {
    type: WysiwygType.Code,
    code: value
  });
}

export function setImageElement(
  editor: SlateEditor,
  link: string,
  caption: string,
  alt: string
) {
  Transforms.setNodes(editor, {
    type: WysiwygType.Image,
    children: [{ text: "" }],
    imageLink: link,
    imageCaption: caption,
    imageAlt: alt
  });
  // focusEditor(editor);
}

export function setImageCaption(editor: SlateEditor, caption: string) {
  Transforms.setNodes(editor, { imageCaption: caption });
}

export function selectElement(editor: SlateEditor, path: Path) {
  Transforms.select(editor, path);
}

export function toggleType(
  editor: SlateEditor,
  type: string,
  headingSize?: string
) {
  const { selection } = editor;
  if (!selection) return;
  const element = getElement(editor);
  if (!element) return;

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true
  });

  if (type === WysiwygType.Heading) {
    Transforms.setNodes(editor, { type, headingSize });
  } else if (type === WysiwygType.Code) {
    Transforms.setNodes(editor, {
      type,
      code: "",
      path: selection.anchor.path
    });
  } else if (LIST_TYPES.includes(type)) {
    Transforms.unsetNodes(editor, "align");
    Transforms.setNodes(editor, { type: WysiwygType.List });
    Transforms.wrapNodes(editor, {
      type,
      align: WysiwygAlign.Left,
      children: []
    });
  } else if (type === WysiwygType.Divider) {
    Transforms.setNodes(editor, { type, path: selection.anchor.path });
  } else {
    Transforms.setNodes(editor, { type, align: WysiwygAlign.Left });
  }

  if ("headingSize" in element && type !== WysiwygType.Heading) {
    Transforms.unsetNodes(editor, "headingSize");
  }

  if ("code" in element) {
    Transforms.unsetNodes(editor, "code");
  }

  if (VOIDS.includes(type)) {
    Transforms.unsetNodes(editor, "align");
  }

  // focusEditor(editor);
}

export function toggleStyle(editor: SlateEditor, style: string) {
  const isActive = isStyleActive(editor, style);

  if (isActive) Editor.removeMark(editor, style);
  else Editor.addMark(editor, style, true);

  // focusEditor(editor);
}

export function toggleAlign(editor: SlateEditor, align: WysiwygAlign) {
  Transforms.setNodes(editor, { align });
  // focusEditor(editor);
}

export function toggleLink(editor: SlateEditor, linkUrl?: string) {
  const { selection } = editor;
  if (!selection) return;

  if (isLinkSelected(editor)) {
    Transforms.unwrapNodes(editor, {
      match: (n) => Element.isElement(n) && n.type === WysiwygStyle.Link
    });
  } else {
    const isSelectionCollapsed = Range.isCollapsed(selection);

    if (isSelectionCollapsed) {
      addElement(editor, {
        type: WysiwygStyle.Link,
        children: [{ text: "link" }],
        url: linkUrl
      });
    } else {
      Transforms.wrapNodes(
        editor,
        {
          type: WysiwygStyle.Link,
          children: [{ text: "" }],
          url: linkUrl
        },
        { split: true, at: selection }
      );
    }
  }

  // focusEditor(editor);
}

export function isStyleActive(editor: SlateEditor, style: string) {
  const styles = Editor.marks(editor);
  return styles ? styles[style] === true : false;
}

export function isLinkSelected(editor: SlateEditor) {
  const { selection } = editor;
  if (!selection) return;

  return (
    Editor.above(editor, {
      match: (n) => (n as CustomElement).type === WysiwygStyle.Link
    }) != null
  );
}

export function isFirstElement(editor: SlateEditor) {
  const { selection } = editor;
  if (!selection) return;
  return getPath(editor, selection)?.toString() === [0, 0].toString();
}

export function collapseSelection(editor: SlateEditor) {
  Transforms.collapse(editor);
}

export function getHeadingSizeKey(value: HeadingSize): string {
  return Object.keys(HeadingSize)[Object.values(HeadingSize).indexOf(value)];
}

export function getTotalWords(content: CustomElement[]) {
  return content
    .map((n) => {
      return Node.string(n).split(/\s+/).length;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toLocaleString();
}

export function newUrl(url: string, searchParams?: SearchParams) {
  const newUrl = new URL(url, `${process.env.NEXT_PUBLIC_BASE_URL}`);
  if (searchParams)
    searchParams.forEach(({ param, value }) => {
      newUrl.searchParams.set(param, value);
    });
  return newUrl;
}

export function isUrl(url: string) {
  try {
    return UrlSchema.parse(url);
  } catch (error) {
    return false;
  }
}

export function convertFileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export function getSlugOrIdFromPath(path: string) {
  const parts = path.split("/");
  const lastName = parts[parts.length - 1];
  return lastName;
}

export function generateId() {
  return nanoid(16).replaceAll("-", "~");
}

export async function addPasskey(toast: any) {
  try {
    const resJson = await getClientFetch("/auth/two-fa/webauthn/register");

    const attestationResponse = await startRegistration({
      optionsJSON: resJson.data.options
    });

    const resOk = await postClientFetch(
      { options: attestationResponse },
      "/auth/two-fa/webauthn/register"
    );

    if (resOk) {
      toast({
        title: "Your Passkey has been added.",
        duration: 2000,
        variant: "success"
      });
    } else {
      toast({
        title: "Error occurred, please try again later.",
        duration: 2000,
        variant: "destructive"
      });
    }

    return true;
  } catch (error) {
    const errTitle =
      error instanceof Error
        ? error.name === "InvalidStateError"
          ? "Passkey already registered!"
          : error.message
        : "Server error please try again later!";
    toast({
      title: errTitle,
      duration: 2000,
      variant: "destructive"
    });

    return false;
  }
}
